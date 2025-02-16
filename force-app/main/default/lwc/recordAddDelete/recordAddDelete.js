import { LightningElement,track } from 'lwc';
import AccountName from '@salesforce/schema/Account.Name';
import AccountPhone from '@salesforce/schema/Account.Phone';
import AccountIndustry from '@salesforce/schema/Account.Industry';
export default class RecordAddDelete extends LightningElement {
    AFIELDS=[AccountName,AccountPhone,AccountIndustry];
    @track arrayLength=[0];

   get showDelete(){
        return this.arrayLength.length > 1;
    }

    handleDelete(){
        this.arrayLength=this.arrayLength.slice(0,this.arrayLength.length-1);
    }

    handelAdd(){
        const arrIndex=this.arrayLength.length;
        this.arrayLength=[...this.arrayLength,arrIndex];
    }
    HandelSuccess(event){
        alert('Record id :'+event.detail.id);
    }
}