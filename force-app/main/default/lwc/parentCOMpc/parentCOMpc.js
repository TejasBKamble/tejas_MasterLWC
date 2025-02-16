import { LightningElement} from 'lwc';

export default class ParentCOMpc extends LightningElement {
     enteardName='';

    // handelChange(event){
    //     this.enteardName=event.target.value;
    // }

    clickhandler(){
        this.enteardName=this.refs.userName.value;
    }
}

// Parent JS PC