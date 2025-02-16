import { LightningElement,track } from 'lwc';
import getOpportunitys from '@salesforce/apex/SearchOpportunitys.getOpportunitys';

export default class SearchOppLWC extends LightningElement {
    @track Records=[];
    searchKey='';
    col=[{label:'Opportunity Name',fieldName:'Name'},
        {label:'Amount',fieldName:'Amount'}
    ];
    HandelChange(event){
        this.searchKey=event.target.value;
    }
    HandelClick(){
        getOpportunitys({oppName:this.searchKey})
            .then(result=>{
                this.Records=result;
            })
            .catch(error=>{
                console.log(error);
            })
        
    }
}