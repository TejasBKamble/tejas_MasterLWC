import { LightningElement, track} from 'lwc';
import AccountName from '@salesforce/schema/Account.Name';
import AccountPhone from '@salesforce/schema/Account.Phone';
import AccountIndustry from '@salesforce/schema/Account.Industry';
import {deleteRecord } from 'lightning/uiRecordApi';

export default class AddandDeleteAccountRow extends LightningElement {
    @track ArrayLength = [0];  // Holds the "indexes" for the added forms
    @track recordIds = [];  // Holds the record IDs of the created Account records
    AccountsFieldas = [AccountName, AccountPhone,AccountIndustry];

    // Add a new form when the Add button is clicked
    HandelAdd() {
        const newIndex = this.ArrayLength.length;  // Calculate the new index
        this.ArrayLength = [...this.ArrayLength, newIndex];  // Add a new index to the array
    }
   
    // Handler to handle success event when a record is created
    HandaleSuccess(event) {
        const newRecordId = event.detail.id;  // Get the record ID from the event
        this.recordIds = [...this.recordIds, newRecordId];  // Store the record ID
        alert('Record is Created. ID: ' + newRecordId);
    }

    // Handler for deleting the last record in the array
    HandelDelete() {
        if (this.recordIds.length > 1) {
            // Get the last created recordId to delete
            const lastRecordId = this.recordIds[this.recordIds.length - 1];
            // Call the deleteRecord API to delete the record
            deleteRecord(lastRecordId)
                .then(() => {
                    // After successful deletion, remove the last record from the recordIds and ArrayLength arrays
                    this.recordIds = this.recordIds.slice(0, this.recordIds.length - 1);
                    this.ArrayLength = this.ArrayLength.slice(0, this.ArrayLength.length - 1);
                    alert('Record Deleted');
                })
                .catch(error => {
                    console.error('Error deleting record: ', error);
                    alert('Error deleting record');
                });
        }
    }
    // Getter to check if the Delete button should be disabled (only if there are no forms to delete)
    get isDeleteButtonDisabled() {
        return this.recordIds.length ===0; // Disable the delete button if there are no records to delete
    }
}
