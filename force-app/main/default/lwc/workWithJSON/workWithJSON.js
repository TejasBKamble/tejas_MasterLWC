import { LightningElement,wire } from 'lwc';
import getJsonValues from '@salesforce/apex/JsonDataHandlerMimick.getJsonValues';
export default class WorkWithJSON extends LightningElement {
    ResponseVar=[];

    HandelResponce(){
        getJsonValues() 
        .then(result=>{this.ResponseVar = result})
        .catch(error=>{console.log("Error in Result",error);})
    }
   // JSON Data convert to String
        jsonData = {
        name: "salesforce",
        version: 64.0,
        status: true,
        address: {
            street: "86a haut street",
            zipcode: "700046"
        }
    };
    get jsonDataString(){
        console.log("JSON data +",JSON.stringify(this.jsonData));
        return JSON.stringify(this.jsonData.address,["zipcode"]);
    }   
}

// jsonData = {
//     name: "salesforce",
//     version: 64.0,
//     status: true,
//     address: {
//         street: "86a haut street",
//         zipcode: "700046"
//     }
// };
// get zipcode() {
//     return this.jsonData.address.zipcode;
// }

/* <p><strong>Street :</strong> {ResponseVar.address.street}</p>
<p><strong>Zipcode :</strong> {ResponseVar.address.zipcode}</p> */

    // @wire(getJsonValues)
    // wirwMethod({data,error}){
    //     if(data){
    //         this.ResponseVar=data;
    //         console.log("Data",data);
    //     }
    //     else if(error){console.log("Error Wire :",error);}
    // } 