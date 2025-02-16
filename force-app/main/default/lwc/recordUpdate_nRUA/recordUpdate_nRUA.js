import { LightningElement,wire,api } from 'lwc';
import { getRecord} from 'lightning/uiRecordApi';
const FIELDS = ['Account.Name', 'Account.Email__c'];
export default class RecordUpdate_nRUA extends LightningElement {
    NameRC;
    EmailRC;
    @api recordId='001dL00000dLwNRQA0';

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
}