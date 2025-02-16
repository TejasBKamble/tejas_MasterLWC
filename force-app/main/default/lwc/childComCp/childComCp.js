import { LightningElement } from 'lwc';

export default class ChildComCp extends LightningElement {

    addHandeler(){
        this.dispatchEvent(new CustomEvent('addevent'));
    }
}

// child C-P JS