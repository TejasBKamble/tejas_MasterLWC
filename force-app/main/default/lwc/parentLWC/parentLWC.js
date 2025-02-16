import { LightningElement } from 'lwc';

export default class ParentLWC extends LightningElement {
    handelNotification(event){
        console.log('Event from Chield',event.detail);
    }
}