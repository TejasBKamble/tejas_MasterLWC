import { LightningElement, api, wire,track } from 'lwc';
import { subscribe, unsubscribe, onError, setDebugFlag, isEmpEnabled } from 'lightning/empApi'; 
import { getRecord,notifyRecordUpdateAvailable ,getRecordNotifyChange } from 'lightning/uiRecordApi';
import { refreshApex } from '@salesforce/apex';

// Fields to retrieve from the Contact record (add more if needed)
const FIELDS = ['Contact.Name', 'Contact.Email'];
export default class ContactUpdater extends LightningElement {

    @api recordId;  // The Contact record ID from the record page
    contactRecord;
    @track contactFields = FIELDS;
    @track contact;  // Store wire service result

    // Holds the channel for the platform event subscription
    @api channelName = '/event/ContactUpdateEvent__e'; 

    // Wire service to get the Contact record data
    @wire(getRecord, { recordId: '$recordId', fields: '$contactFields' })
    wiredContact(result) {
        this.contact = result;
        if (result.data) {
            this.contactRecord = result.data;
            console.log('Contact record data:', this.contactRecord);
        } else if (result.error) {
            console.error('Error retrieving contact data:', result.error);
        }
    }

    connectedCallback() {
        // Subscribe to the Platform Event on component load
        this.subscribeToContactUpdateEvent();
    }

    disconnectedCallback() {
        // Unsubscribe from the event when the component is destroyed
        this.unsubscribeFromContactUpdateEvent();
    }

    // Subscribe to the Platform Event using empApi
    subscribeToContactUpdateEvent() {
        // Check if the Streaming API (empApi) is enabled
        if (isEmpEnabled) {
            subscribe(this.channelName, -1, this.handleEvent.bind(this))  // -1 for real-time updates
                .then(response => {
                    console.log('Subscribed to ContactUpdateEvent:', response);
                })
                .catch(error => {
                    console.error('Error subscribing to event:', error);
                });

            // Optional: Set debug flag to view raw events in the console
            setDebugFlag(true);

            // Optional: Handle errors that occur during the subscription
            onError((error) => {
                console.error('Error with empApi subscription:', error);
            });
        } else {
            console.error('Streaming API (empApi) is not enabled for this org.');
        }
    }

    async handleEvent(event) {
        console.log('Received event: ', event);
    
        // Convert the ContactId__c field to an ID
        const eventContactId = Id.valueOf(event.payload.ContactId__c);
        console.log('Contact Id is = ',eventContactId);
         refreshApex(this.contact);
        await apexUpdateRecord(this.recordId);
        //notifyRecordUpdateAvailable([{recordId: this.recordId}]);
        getRecordNotifyChange([{ recordId: this.recordId }]);
        // Check if the event is for the current Contact
        if (eventContactId === this.recordId) {
            console.log(`Contact ${event.payload.ContactId} was updated. Fields updated: ${event.payload.UpdatedFields}`);
    
            // Refresh the contact data after the update
            refreshApex(this.contact);
        }
    }

    unsubscribeFromContactUpdateEvent() {
        unsubscribe(this.channelName)
            .then(response => {
                console.log('Unsubscribed from ContactUpdateEvent:', response);
            })
            .catch(error => {
                console.error('Error unsubscribing from event:', error);
            });
    }
}