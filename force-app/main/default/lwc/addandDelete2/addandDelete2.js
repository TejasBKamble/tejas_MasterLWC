import { LightningElement,track } from 'lwc';
import AccountName from '@salesforce/schema/Account.Name';
import AccountPhone from '@salesforce/schema/Account.Phone';
import { deleteRecord } from 'lightning/uiRecordApi';

export default class AddandDelete2 extends LightningElement {
    @track ArrayLength = [0];  // Holds the "indexes" for the added forms
    @track records = [];  // Array to hold records displayed in the data table
    AccFielda = [AccountName, AccountPhone];

    // Define columns for the data table
    columns = [
        { label: 'Account Name', fieldName: 'Name' },
        { label: 'Phone', fieldName: 'Phone' },
        {
            type: 'button', 
            typeAttributes: { label: 'Delete', name: 'delete', variant: 'destructive' }
        }
    ];

    // Add a new form when the Add button is clicked
    HandelAdd() {
        const newIndex = this.ArrayLength.length;  // Calculate the new index
        this.ArrayLength = [...this.ArrayLength, newIndex];  // Add a new index to the array
    }

    // Handler to handle success event when a record is created
    HandaleSuccess(event) {
        const newRecordId = event.detail.id;  // Get the record ID from the event
        const newRecord = {
            Id: newRecordId,
            Name: event.detail.fields.Name,
            Phone: event.detail.fields.Phone
        };

        this.records = [...this.records, newRecord];  // Add the new record to the array
        alert('Record is Created. ID: ' + newRecordId);
    }

    // Handler for deleting a specific record from the data table
    HandelDelete(event) {
        const recordIdToDelete = event.detail.row.Id;  // Get the record ID from the clicked row

        deleteRecord(recordIdToDelete)
            .then(() => {
                // After successful deletion, remove the record from the records array
                this.records = this.records.filter(record => record.Id !== recordIdToDelete);
                alert('Record Deleted');
            })
            .catch(error => {
                console.error('Error deleting record: ', error);
                alert('Error deleting record');
            });
    }

    // Getter to check if the Delete button should be disabled (only if there are no records to delete)
    get isDeleteButtonDisabled() {
        return this.records.length === 0;  // Disable the delete button if there are no records to delete
    }
}