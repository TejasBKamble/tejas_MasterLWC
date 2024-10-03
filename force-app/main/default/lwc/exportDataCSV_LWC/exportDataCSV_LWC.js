import { LightningElement,wire } from 'lwc';
import accountRacords from'@salesforce/apex/csvController.accountRacords';

const columns=[
    {label:"Name",fieldName:"Name"},
    {label:"Industry",fieldName:"Industry"},
    {label:"Phone",fieldName:"Phone"}
];

export default class ExportDataCSV_LWC extends LightningElement {

    columns=columns;
    accountData=[];
    selectedRows=[];
    @wire(accountRacords)
    wireMathod({data,error}){
        if(data){
         this.accountData=data;
        }
        else{
            console.log(error);
        }
    }

    get chackRacords(){
       return this.accountData.length > 0 ? false : true;
    }

    // handleButtonClick(){
    //     console.log('Selected Rows: ', this.selectedRows);
    // }
    handleRowSelection(event) {
        // Get selected rows
        this.selectedRows = event.detail.selectedRows;
    }

    clickHindler(){
        let downloadeRecords=[];

        console.log("selectedR ",selectedRows);
         
        if(selectedRows > 0){
            downloadeRecords=[selectedRow];
        }
        else{
            downloadeRecords=[...this.accountData];
        }
 
        // Convert Array to CSV
       let csvfile= this.convertArrayToCSV(downloadeRecords);

       this.createLinkDownloade(csvfile);
    }

    convertArrayToCSV(downloadeRecords){
        let csvHader = Object.keys(downloadeRecords[0]).toString();
        let csvBody= downloadeRecords.map((curritem)=>Object.values(curritem).toString()); 
        let csvFile= csvHader +"\n"+ csvBody.join("\n");
        return csvFile;
    }

    createLinkDownloade(csvfile){
        const downloadLink= document.createElement("a");
        downloadLink.href="data:text/csv;cherset=utf-8,"+ encodeURI(csvfile);
        downloadLink.target='_blank';
        downloadLink.download='Account_Data.csv';
        downloadLink.click();

    }

}