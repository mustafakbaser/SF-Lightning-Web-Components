import { LightningElement, api, wire } from "lwc";
import getBoatsByLocation from '@salesforce/apex/BoatDataService.getBoatsByLocation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const SUCCESS_TITLE = 'Success';
const MESSAGE_SHIP_IT = 'Ship it!';
const SUCCESS_VARIANT = 'success';
const ERROR_TITLE = 'Error loading Boats Near Me';
const ERROR_VARIANT = 'error';
const LABEL_YOU_ARE_HERE = 'You are here!';
const ICON_STANDARD_USER = 'standard:user';


export default class BoatsNearMe extends LightningElement {
    
  @api
  boatTypeId;
  mapMarkers = [];
  isLoading = true;
  isRendered;
  latitude;
  longitude;
 
  @wire(getBoatsByLocation, {latitude: '$latitude', longitude: '$longitude', boatTypeId: '$boatTypeId'})
  wiredBoatsJSON({error, data}) {
      if (data) {
          this.createMapMarkers(data);
      } else if (error) {
          const toast = new ShowToastEvent({
              title: ERROR_TITLE,
              message: error.message,
              variant: ERROR_VARIANT,
          });
          this.dispatchEvent(toast);
      }
      this.isLoading = false;
  }

 
  renderedCallback() {
      if (!this.isRendered) {
          this.getLocationFromBrowser();
      }
      this.isRendered = true;
  }

  // Gets the location for using browser
  // position => {latitude and longitude}
  getLocationFromBrowser() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
              this.latitude = position.coords.latitude;
              this.longitude = position.coords.longitude;
          });
      }
  }

  // Creates the map markers
  createMapMarkers(boatData) {
      const newMarkers = JSON.parse(boatData).map(boat => {
          return {
              title: boat.Name,
              location: {
                  Latitude: boat.Geolocation__Latitude__s,
                  Longitude: boat.Geolocation__Longitude__s
              }
          };
      });
      newMarkers.unshift({
          title: LABEL_YOU_ARE_HERE,
          icon: ICON_STANDARD_USER,
          location: {
              Latitude: this.latitude,
              Longitude: this.longitude
          }
      });
      this.mapMarkers = newMarkers;
  }
}