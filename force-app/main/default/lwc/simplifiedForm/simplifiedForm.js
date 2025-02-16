import { LightningElement, track } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import PHONE_FIELD from '@salesforce/schema/Account.Phone';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class SimplifiedForm extends LightningElement {
    // Fields for record form
    fieldsArray = [NAME_FIELD, PHONE_FIELD, INDUSTRY_FIELD];
    // Tracks the list of added forms
    @track addArray = [0];
    
    // Get the condition to show delete button
    get showdelete() {
        return this.addArray.length > 1;
    }

    // Handler to add new form
    addclickHandler() {
        const newIndex = this.addArray.length; // Add a new index
        this.addArray = [...this.addArray, newIndex]; // Add the new form to the array
    }

    // Handler to delete a form based on index
    deleteclickHandler() {
        // Remove the last form from the array
        this.addArray = this.addArray.slice(0, this.addArray.length - 1);
    }

    // Handler for record form submission success
    successHandler(event) {
        alert('Record created with ID: ' + event.detail.id);
    }
}
