import { LightningElement,wire ,api} from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
export default class NavShowContact extends LightningElement {
    @api recordId;

    @wire(CurrentPageReference)
    getMethod(CurrentPageReference){
        if(CurrentPageReference){ 
            const rid=CurrentPageReference.state;
            this.recordId=rid.c__recordId;
        }
    }

}


// @wire(CurrentPageReference)
// getStateParameters(currentPageReference) {
//     if (currentPageReference) {
//         const state = currentPageReference.state;
//         this.recordId = state.c__recordId;

//     }   
// }