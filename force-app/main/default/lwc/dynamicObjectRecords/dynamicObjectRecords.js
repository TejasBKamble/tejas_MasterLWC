import { LightningElement, track, wire } from 'lwc';
import getRecords from '@salesforce/apex/DaynamicObjectRecordsController.getRecords';

const OBJECT_OPTIONS = [
    { label: 'Account', value: 'Account' },
    { label: 'Contact', value: 'Contact' },
    { label: 'Opportunity', value: 'Opportunity' },
];

export default class DynamicObjectRecords extends LightningElement {
    @track objectOptions = OBJECT_OPTIONS; // Picklist options
    @track records = []; // To store fetched records
    @track columns = []; // To store columns for data table
    selectedObject = ''; // Selected object name

    // Handle object selection
    handleObjectChange(event) {
        this.selectedObject = event.detail.value; // Get selected value
        this.fetchRecords(); // Fetch records for selected object
    }

    // Fetch records dynamically
    fetchRecords() {
        if (!this.selectedObject) {
            this.records = [];
            this.columns = [];
            return;
        }

        getRecords({ objectName: this.selectedObject })
            .then((result) => {
                if (result.length > 0) {
                    // Dynamically create columns based on field names
                    const firstRecord = result[0];
                    this.columns = Object.keys(firstRecord).map((key) => ({
                        label: key,
                        fieldName: key,
                        type: typeof firstRecord[key] === 'object' ? 'object' : 'text',
                    }));
                    this.records = result;
                } else {
                    this.records = [];
                    this.columns = [];
                }
            })
            .catch((error) => {
                console.error('Error fetching records:', error);
            });
    }
}
// tejas