import { LightningElement,track,wire,api } from 'lwc';
import ACC_DATA from '@salesforce/apex/AccDataControler.getAccData';
import {NavigationMixin} from 'lightning/navigation'
export default class Navgation extends NavigationMixin(LightningElement) {

    @track accounts;
    @track error;
    @track selectedAccountId;
    @wire(ACC_DATA)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.accounts = undefined;
        }
    }

    get accountOptions() {
        return this.accounts.map(account => {
            return {
                label: account.Name,
                value: account.Id
            };
        });
    }

    handleAccountChange(event) {
        this.selectedAccountId = event.detail.value;
    }
    
    navigateToContacts(){
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
              apiName:'Account_Collections'
            },
            state:{
                c__recordId:this.selectedAccountId
            }
        });
    } 

}