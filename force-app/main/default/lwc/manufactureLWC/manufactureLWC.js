import { LightningElement,track,wire} from 'lwc';
import getAccounts from '@salesforce/apex/AccountController.getAccounts';
import MyModel from 'c/myModel';
export default class ManufactureLWC extends LightningElement {

    @track accounts;
    @track error;
    Selectedrow;

    columns = [
        { label: 'Account Name', fieldName: 'Name', type: 'text' },
        {
            type: 'action',
            typeAttributes: { rowActions: this.getRowActions }
        }
    ];

    @wire(getAccounts)
    wiredAccounts({ error, data }) {
        if (data) {
            this.accounts = data;
            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.accounts = undefined;
        }
    }

    getRowActions(row, doneCallback) {
        const actions = [
            { label: 'Edit', name: 'edit' }
        ];
        doneCallback(actions);
    }

    handleRowAction(event) {
        const actionName = event.detail.action.name;
         const row = event.detail.row;
         this.Selectedrow=row.Id;

        switch (actionName) {
            case 'edit':
                this.editAccount(row);
                break;
            default:
        }
    }

    openAccount() {
        // Logic to open the account in edit mode
        console.log('Open Account in Edit Mode');
    }

    async editAccount(row) {
        // Logic to open the specific account in edit mode
        console.log('Edit Account:', row);
        // Open model
        const result = await MyModel.open({
            size: 'large',
            description: 'Accessible description of modal\'s purpose',
            content:this.Selectedrow,
        });
    }

    // Model Window
    async handleClick() {
        const result = await MyModel.open({
            size: 'large',
            description: 'Accessible description of modal\'s purpose',
            content: 'Passed into content '+this.Selectedrow,
        });
        
        console.log(result);
    }
}