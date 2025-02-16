import { LightningElement } from 'lwc';

export default class ParentComCp extends LightningElement {
    counter=0;
    handelCount(){
    this.counter++;
    }
}