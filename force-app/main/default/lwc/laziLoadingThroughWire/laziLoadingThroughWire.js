import { LightningElement, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
export default class LaziLoadingThroughWire extends LightningElement {

    accounts;
    error;
    isLoading = false;

    // Wire to fetch data lazily
    @wire(getAccounts)
    wiredAccounts({ data, error }) {
        if (data) {
            this.accounts = data;
            this.error = undefined;
            this.isLoading = false; // Stop the spinner
        } else if (error) {
            this.error = error.body.message;
            this.accounts = undefined;
            this.isLoading = false; // Stop the spinner
        }
    }

    handleLoadData() {
        // Trigger the wire service to lazily load data
        this.isLoading = true;
        // This will automatically trigger the @wire method to fetch the data
    }
}