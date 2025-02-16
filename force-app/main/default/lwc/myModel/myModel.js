import { api,track } from 'lwc';
import LightningModal from 'lightning/modal';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { createRecord } from 'lightning/uiRecordApi';

export default class MyModel extends LightningModal {
    @api content;
    @track showAccountForm=true;
    @track showOrderForm=false;
    @track showItemForm=false;

    handleOkay() {
        this.close('okay');
    }
    //Order

    handleSuccess(event) {
        const evt = new ShowToastEvent({
            title: 'Account created',
            message: 'Record ID: ' + event.detail.id,
            variant: 'success',
        });
        this.dispatchEvent(evt);
    }
    handleOrderSuccess(event){

        const evt = new ShowToastEvent({
            title: 'Order created',
            message: 'Record ID: ' + event.detail.id,
            variant: 'success',
        });
        this.dispatchEvent(evt);
    }
    handleItemSuccess(event){
        const evt = new ShowToastEvent({
            title: 'Item Added',
            message: 'Record ID: ' + event.detail.id,
            variant: 'success',
        });
        this.dispatchEvent(evt);
    }
    // record form Event Handeling
    handleSuccess(event) {
       // console.log('Record updated successfully:', event.detail.id);
       const evt = new ShowToastEvent({
        title: 'Account Modified',
        message: 'Record ID: ' + event.detail.id,
        variant: 'success',
    });
    this.dispatchEvent(evt);
    }

    handleError(event) {
        console.error('Error updating record:', event.detail.message);
    }

    showHandeler(){
        this.showAccountForm=false;
        this.showOrderForm=true;
    }
    showItemHandeler(){
        this.showAccountForm=false;
        this.showOrderForm=false;
        this.showItemForm=true;
    }
}
