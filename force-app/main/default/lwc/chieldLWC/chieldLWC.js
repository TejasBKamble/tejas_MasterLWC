import { LightningElement,api } from 'lwc';

export default class ChieldLWC extends LightningElement {

    messagechield='Message from Chield 699';
    HandelClick(){
       

          this.dispatchEvent(new CustomEvent("notification",{
            detail:this.messagechield,
            bubbles:true,
            composed:true
        }));
    }
  // Define properties to hold form data
  name = '';
  email = '';
  age = '';
  result = '';

  // Handle input change for each field
  handleInputChange(event) {
      const field = event.target.dataset.id;
      if (field === 'name') {
          this.name = event.target.value;
      } else if (field === 'email') {
          this.email = event.target.value;
      } else if (field === 'age') {
          this.age = event.target.value;
      }
  }

  // Handle form submission
  handleSubmit() {
      // Generate result based on captured data
      this.result = `Name: ${this.name}<br> Email: ${this.email} <br> Age: ${this.age}`;
  }
}