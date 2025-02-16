import { LightningElement, wire } from 'lwc';
//import getContacts from '@Salesforce/apex/GetContactsinDataTable.getContacts';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';

const COLUMNS = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Industry', fieldName: 'Industry' }
];

export default class GetAndShowContactDataTable extends LightningElement {
    columns = COLUMNS; // Use consistent naming convention
    conData = []; // Store data fetched from Apex
    selectedR = ''; // For storing selected rows
    selectedRowsHandle = []; // For storing selected row IDs
    selectedRowsHandleArry = [];
    selectedID;
    // Wire to fetch accounts data from Apex controller
    @wire(getAccounts)
    wireMethod({ data, error }) {
        if (data) {
            this.conData = data; // Assign the fetched data to the table data
        } else if (error) {
            console.error('Error in Account data', error); // Handle error
        }
    }

    // Handler for row selection
    handleRowSelection(event) {
    
        const selectedRows = event.detail.selectedRows;

        // Check if there are selected rows
        if (selectedRows.length > 0) {

            this.rid=selectedRows.length-1;

            this.selectedID = selectedRows[this.rid].Id;
            console.log('Selected Id',this.selectedID);
           // this.selectedRowsHandleArry=[...this.selectedRowsHandleArry,selectedRows[this.rid].Id];

            this.selectedRowsHandle=selectedRows.map(row => row.Id);
            console.log('SelectedRows Id',this.selectedRowsHandle);
        }
    }
}
