import { LightningElement,track } from 'lwc';

export default class GrandParentLWC extends LightningElement {
    dataR='';
    valueR='';
    @track captureData

    handleOuterClick(event) {

         this.captureData=event.detail;
        this.dataR=this.captureData;
       

        console.log('Grand Parent component - Capture phase');
        console.log('Event Details',this.captureData);
    }
}

