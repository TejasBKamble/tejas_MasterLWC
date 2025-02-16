import { LightningElement, wire, track } from 'lwc';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';
import { getPicklistValues } from 'lightning/uiObjectInfoApi';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';

export default class DynamicPicklistExample extends LightningElement {
    @track picklistValues = [];
    recordTypeId;

    // Fetch Record Type ID dynamically
    @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
    wiredObjectInfo({ error, data }) {
        if (data) {
            this.recordTypeId = data.defaultRecordTypeId; // Dynamically setting Record Type Id
        } else if (error) {
            console.error('Error fetching object info:', error);
        }
    }

    // Fetch Picklist Values dynamically using the Record Type Id
    @wire(getPicklistValues, { recordTypeId: '$recordTypeId', fieldApiName: INDUSTRY_FIELD })
    wiredPicklistValues({ error, data }) {
        if (data) {
            this.picklistValues = data.values;
        } else if (error) {
            console.error('Error fetching picklist values:', error);
        }
    }

    handleChange(event) {
        console.log('Selected Picklist Value:', event.target.value);
    }
}
//tejas