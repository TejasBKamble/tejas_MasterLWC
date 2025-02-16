import { LightningElement, api, track,wire } from 'lwc';
import { subscribe, unsubscribe } from 'lightning/empApi';
import { getRecord, notifyRecordUpdateAvailable, getRecordNotifyChange } from 'lightning/uiRecordApi';

const FIELDS = ['Account.Name', 'Account.Email__c'];
export default class PlatformEventDemo extends LightningElement {
    @api recordId;
    @track data = [];
    @track contactFields = FIELDS;
    @track contactRecord;
    NameRC;
    EmailRC;
    @track columns = [
        { label: 'Id', fieldName: 'RecordId__c' },
        { label: 'Change Type', fieldName: 'Change_Type__c' }
    ];
  // get Records and Display Name and Email on a Tile 
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredContact({ error, data }) {
        if (data) {
            this.NameRC = data.fields.Name.value;
            this.EmailRC = data.fields.Email__c.value;
        } else if (error) {
            console.error('Error retrieving contact data:', error);
        }
    }
 // get Records and Display Name and Email on a Tile 

    subscription = {};  // This is where the subscription object will be stored
    @api channelName = '/event/Account_Updated__e';
 
    connectedCallback() {
        this.handleSubscribe();
    }

    disconnectedCallback() {
        this.unsubscribeFromContactUpdateEvent();
    }

    proxyToObj(obj) {
        return JSON.parse(JSON.stringify(obj));
    }

    handleSubscribe() {
        const self = this;
        const messageCallback = function (response) {
            console.log('New message received 1: ', JSON.stringify(response));
            console.log('New message received 2: ', response);

            var obj = JSON.parse(JSON.stringify(response));

            // Update the data array reactively by replacing it
            self.data = [...self.data, {
                RecordId__c: obj.data.payload.RecordId__c,
                Change_Type__c: obj.data.payload.Change_Type__c
            }];
            console.log('this.data -> ' + JSON.stringify(self.data));

            // Notify that the record has been updated, so UI can refresh

           notifyRecordUpdateAvailable([{ recordId: self.recordId }]);
           // getRecordNotifyChange([{ recordId: self.recordId }]); //its also Working but OLD
        };

        subscribe(this.channelName, -1, messageCallback).then(response => {
            console.log('Subscription request sent to: ', JSON.stringify(response.channel));
            this.subscription = response;  // Store the subscription object for later use
        }).catch(error => {
            console.error('Error during subscription: ', error);
        });
    }

    unsubscribeFromContactUpdateEvent() {
        if (this.subscription && this.subscription.channel) {
            unsubscribe(this.subscription)  // Pass the subscription object to unsubscribe
                .then(response => {
                    console.log('Unsubscribed from event:', response);
                })
                .catch(error => {
                    console.error('Error unsubscribing from event:', error);
                });
        } else {
            console.warn('No active subscription to unsubscribe from');
        }
    }
}



////////////////////Testing Execute Anonymous window//////////////////////////////////////

// Account AccountUpd = [SELECT Id, Name, Email__c FROM Account WHERE Id = '001dL00000dLwNRQA0' LIMIT 1];
// AccountUpd.Email__c = 'ADS@example.com';
// update AccountUpd;



