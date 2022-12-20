import { LightningElement, api, wire } from "lwc";
import getBoatsByLocation from '@salesforce/apex/BoatDataService.getBoatsByLocation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const SUCCESS_TITLE = 'Success';
const MESSAGE_SHIP_IT = 'Ship it!';
const SUCCESS_VARIANT = 'success';
const ERROR_TITLE   = 'Error';
const ERROR_VARIANT = 'error';
const YOUR_LOCATION = 'Your current location';
const STD_USER_ICON = 'standart:user';

export default class BoatSearchResults extends LightningElement {

    @api 
    selectedBoatId;
    columns = [];
    boatTypeId;
    boats;
    isLoading = true;
    isRendered;
    locationMarkers = [];
    latitude;
    longitude;
    

    @wire(getBoatsByLocation, {latitude: '$latitude', longitude: '$longitude', boatTypeId: '$boatTypeId'})
    wiredBoatsJSON({error, data}){
      if(data){
        this.createMapMarkers(data);
      } else if(error){
        const toast = new ShowToastEvent({
          title: ERROR_TITLE,
          message: error.message,
          variant: ERROR_VARIANT
        });
        this.isLoading=false;
      }
    }

    renderedCallBack(){
      if(!this.isRendered){
        this.getLocationFromBrowser();
      }
      this.isRendered = true;
    }


    getLocationFromBrowser(){
      if(navigator.getLocation){
        navigator.geolocation.getCurrentPosition(position => { 
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
        });
      }
    }

    createMapMarkers(boatData){
      const newMarkers = JSON.parse(boatData).map(boat => {
        return {
          title: boat.Name,
          location: {
            latitude: boat.Geolocation__Latitude__s,
            longitude: boat.Geolocation__Longitude__s
          }
        };
      });
      newMarkers.unshift({
        title:YOUR_LOCATION,
        icon: STD_USER_ICON,
        location:{
          Latitude: this.latitude,
          Longitude: this.longitude
        }
      });
      this.locationMarkers = newMarkers;
    }
}
