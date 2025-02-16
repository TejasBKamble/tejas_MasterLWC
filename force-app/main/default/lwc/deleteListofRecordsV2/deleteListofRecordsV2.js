import { LightningElement, wire } from 'lwc';
import { getListInfoByName } from "lightning/uiListsApi";
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import { refreshApex } from '@salesforce/apex';

const COLUMNS = [
    { label: 'Account Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone' },
    { label: 'Website', fieldName: 'Website' }
];

export default class DeleteListofRecordsV2 extends LightningElement {
    accountData = [];
    columns = COLUMNS;
    disabledDeleteButton = true;
    selectedRowMapping = [];
    pageToken = null;
    nextPageToken = null;
    previousPageToken = null;
    wiredAccountsResult;
    displayColumns=[];

    // Wire service to retrieve a list of Accounts using getListInfoByName
    @wire(getListInfoByName, {
        objectApiName: ACCOUNT_OBJECT,
        listViewApiName: 'AllAccounts',  // You can replace with a specific ListView name
       
    })
    wiredAccounts({ error, data }) {
        this.wiredAccountsResult = data;
        if (data) {
            this.accountData = data.records.records.map(record => ({
                id: record.id,
                Name: record.fields.Name.value,
                Phone: record.fields.Phone ? record.fields.Phone.value : '',
                Website: record.fields.Website ? record.fields.Website.value : ''
            }));
        } else if (error) {
            console.error('Error retrieving accounts:', error);
        }
    }

}
