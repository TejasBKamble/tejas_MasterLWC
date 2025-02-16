import { LightningElement,api } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
export default class NavSamePagecom extends NavigationMixin(LightningElement) {
   // @api selectedAccountId='001dL00000FVkmeQAD';
    navigateToTargetComponent() {
        let cmpDef={
            componentDef:"c:collectionHeader"
    
           };
           let encodeDef=btoa(JSON.stringify(cmpDef));
           this[NavigationMixin.Navigate]
           ({
            type:"standard__webPage",
            attributes:{
                url:"one/one.app#"+encodeDef
            },
          
           });
    }
}




// navigateToTargetComponent() {
//     let cmpDef={
//         componentDef:"c:collectionHeader"

//        };
//        let encodeDef=btoa(JSON.stringify(cmpDef));
//        this[NavigationMixin.Navigate]
//        ({
//         type:"standard__webPage",
//         attributes:{
//             url:"one/one.app#"+encodeDef
//         },
//         state:{
//             c__recordId:this.selectedAccountId
//         }
//        });
// }