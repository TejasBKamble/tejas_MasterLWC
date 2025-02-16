import { LightningElement, wire } from 'lwc';
import getRandomAccounts from '@salesforce/apex/RandomAccountController.getRandomAccounts';

export default class RandomAccountDisplay extends LightningElement {
    accounts = [];
    error;

    @wire(getRandomAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
        } else if (error) {
            this.error = error;
        }
    }
}
