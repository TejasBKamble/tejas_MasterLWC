import { LightningElement } from 'lwc';
import loadRecordById from '@salesforce/apex/InfaLoading.loadRecordById';
import loadMoreData from '@salesforce/apex/InfaLoading.loadMoreData';
import countAccount from '@salesforce/apex/InfaLoading.countAccount';

const columns = [ 
    {label: "Name", fieldName: "Name"},
    {label: "Industry", fieldName: "Industry"},
    {label: "Phone", fieldName: "Phone"},
    {label: "Rating", fieldName: "Rating"}
];

export default class LazyLoadingDataTable extends LightningElement {
    data=[];
    columns=columns;
    totalRecords=0;
    recordLoaded=0;

    connectedCallback(){
        this.loadData();
    }
    async loadData(){
       try {
         this.totalRecords= await countAccount();
         this.data= await LoadeRacordByID();
         this.recordLoaded=this.data.length;
       } catch (error) {
        console.log('Error :',error);
       }
    }

    async LoadeMoreData(event){
        try {
            const {target} =event;
            target.isLoading = true; // spanner
            let currentRecord=this.data;
            let lastRecord=currentRecord[currentRecord.length - 1 ];

            let newRecord=await LoadeMoreData({
                lastid:lastRecord.Id,
                lastName:lastRecord.Name
            });

            this.data=[...currentRecord,...newRecord];
            this.recordLoaded=this.data.length;
            target.isLoading = true; // spanner
        } catch (error) {
            console.log("Error :",error);
        }
    }
}