import { LightningElement, wire } from 'lwc';
import { getListUi } from 'lightning/uiListApi';
import { getListInfoByName } from 'lightning/uiListApi';
import { deleteRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import { refreshApex } from '@salesforce/apex';
const COLUMNS = [
        { label: 'Account Name', fieldName: 'Name' },
        { label: 'Phone', fieldName: 'Phone' },
        { label: 'Website', fieldName: 'Website' }
];

export default class DeleteMultipleAccountDataTable extends LightningElement {
    accountData = [];
    col = COLUMNS;
    DisabledDeletdButton = true;

    SelectedRowMaping=[];
    pageToken = null;
    nextPageToken = null;
    previousPageToken = null;

    // Wire service to retrieve a list of Accounts using getListUi
    @wire(getListUi, {
        objectApiName: ACCOUNT_OBJECT,
        listViewApiName: 'AllAccounts', // You can replace with a specific ListView name
        sortBy: 'Name',
        pageSize: 10,
        pageToken: "$pageToken"
    })
    wiredAccounts({ error, data }) {
        if (data) {
            console.log('Fetched data: ', data);
    
            this.nextPageToken = data.records.nextPageToken,
            this.previousPageToken = data.records.previousPageToken
            // Map the data to a simpler format for the datatable
            this.accountData = data.records.records.map(record => ({
                id: record.id,
                Name: record.fields.Name.value,
                Phone: record.fields.Phone ? record.fields.Phone.value : '',
                Website: record.fields.Website ? record.fields.Website.value : '',
              
            }));
            // Debug the accounts data after mapping
            console.log('Mapped accounts data: ', this.accountData);
        } else if (error) {
            console.error('Error retrieving accounts:', error);
        }
    }
    handleNextPage(e) {
        this.pageToken = this.nextPageToken;
      }
    
      handlePreviousPage(e) {
        this.pageToken = this.previousPageToken;
      }
  
    // Handle row selection event
    HandelRowSelection(event) {
        const selectedRows = event.detail.selectedRows;
        console.log('Selected row...',selectedRows.length);
       if(selectedRows.length >0){
        
          this.SelectedRowMaping = selectedRows.map(row => row.id);
          console.log("Selected Row map",this.SelectedRowMaping);
 
          this.DisabledDeletdButton = this.SelectedRowMaping.length === 0;
       }
       else{
        this.DisabledDeletdButton = true;
       }
    }
    
    // Handle delete action
    HandeleDelete() {
          // Create an array of promises for each delete operation
    const promises = this.SelectedRowMaping.map(id => {
        return deleteRecord(id)
            .then(() => {
                this.showToast('Success', `Account ${id} deleted successfully!`, 'success');
            })
            .catch(error => {
                this.showToast('Error', `Failed to delete Account ${id}: ${error.body.message}`, 'error');
            });
    });

    // Wait for all delete operations to complete
    Promise.all(promises)
        .then(() => {
            // Clear the selected rows mapping after deletion is complete
            this.SelectedRowMaping = [];
            
            // Filter out the deleted accounts from the account data
            this.accountData = this.accountData.filter(account => !this.SelectedRowMaping.includes(account.Id));
            refreshApex(this.accountData);
            this.DisabledDeletdButton = this.SelectedRowMaping.length === 0;
        });
    }

    // Show toast notification
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(event);
    }
}