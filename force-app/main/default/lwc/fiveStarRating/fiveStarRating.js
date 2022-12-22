import { LightningElement, api } from 'lwc';


// Defining constants
const ERROR_TITLE = 'Error loading five-star';
const ERROR_VARIANT = 'error';
const EDITABLE_CLASS = 'c-rating';
const READ_ONLY_CLASS = 'readonly c-rating';

export default class FiveStarRating extends LightningElement {

  @api readOnly;
  @api value;

  editedValue;
  isRendered;
}