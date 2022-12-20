import { LightningElement, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import BoatMessageChannel from '@salesforce/messageChannel/BoatMessageChannel__c';
import { subscribe, MessageContext, APPLICATION_SCOPE } from 'lightning/messageService';

// Declaring LONGITUDE and LATITUDE fields as const
const LONGITUDE = "Boat__c.Geolocation__Longitude__s";
const LATITUDE = "Boat__c.Geolocation__Latitude__s";

// Declaring field combination for BOAT
const BOAT_FIELDS = [LONGITUDE, LATITUDE];

export default class BoatMap extends LightningElement {
    error = undefined;
    locationMarkers=[];
    subscription = null;
    boatId;

    @api
    get recordId(){
        return this.boatId;
    }
    set recordId(value){
        this.setAttribute('boatId', value);
        this.boatId = value;
    }

    @wire(MessageContext)
    messageContext;
}