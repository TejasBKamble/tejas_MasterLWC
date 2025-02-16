import { LightningElement } from 'lwc';
import ACCinsertRecord from '@salesforce/apex/CreateRecordValidationBypass.ACCinsertRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RecordCreationBypassValidation extends LightningElement {
    NameField = '';
    PhoneField = '';
    EmailField = '';

    // Event handlers to update the values when user changes the input
    NameChange(event) {
        this.NameField = event.target.value;
    }

    PhoneChange(event) {
        this.PhoneField = event.target.value;
    }

    EmailChange(event) {
        this.EmailField = event.target.value;
    }

    // Method to insert a new Account record
    handleInsert() {
        // Ensure that Name is provided (required field)
        if (!this.NameField) {
            this.showToast('Error', 'Name is required', 'error');
            return;
        }

        // Prepare the new record with the user input
        const newRecord = {
            sObjectType: 'Account',  // Object type
            Name: this.NameField,    // Name field (required)
            Phone: this.PhoneField,  // Phone field (optional)
            Email__c: this.EmailField // Custom Email field (optional)
        };

        // Call the Apex method to insert the record
        ACCinsertRecord({ AccRecord: newRecord })
            .then(result => {
                this.showToast('Success', result, 'success');
                // Clear input fields after successful insertion
                this.NameField = '';
                this.PhoneField = '';
                this.EmailField = '';
            })
            .catch(error => {
                this.showToast('Error', error.body.message, 'error');
            });
    }

    // Utility method to show toast notifications
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}
