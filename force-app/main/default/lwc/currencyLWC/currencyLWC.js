import { LightningElement } from 'lwc';

export default class CurrencyLWC extends LightningElement {

    currencyValue = "";
    currencyCode = "";
    showOutPut = false;
    currencyOption = [];
    enterdAmount=0;
    fromCurr;
    toCurr;

    connectedCallback() {
        this.fatchSybols();
    }

    currencyHandler(event) {
        let { name, value } = event.target;

        if (name === 'amount') this.enterdAmount = value;
        if (name === 'fromCurrency') this.fromCurr = value;
        if (name === 'toCurrency') this.toCurr = value;


    }

    async fatchSybols() {
        let endPoint = 'https://api.frankfurter.app/currencies';
        try {

            let responce = await fetch(endPoint);

            if (!responce.ok) {
                throw new Error('Responce is Not OK');
            }
            const data = await responce.json();

            let options = [];
            for (let symbol in data) {
                options = [...options, { label: symbol, value: symbol }];
            }
            this.currencyOption = [...options];
        } catch (error) {
            console.log("Error ", error);
        }
    }

    clickHanler() {
        this.conversion(this.fromCurr, this.toCurr, this.enterdAmount);
    }

    async conversion(from, to, amount) {
        try {
            fetch(`https://api.frankfurter.app/latest?base=${from}&symbols=${to}`)
            .then((resp) => resp.json())
            .then((data) => {  
                this.currencyValue = (amount * data.rates[to]).toFixed(2);
                alert(`${amount} ${from} = ${this.currencyValue} ${to}`);
               // this.currencyValue=convertedAmount;
            }
        );

        this.showOutPut=true;

            
        } catch (error) {
            
        }
       
    }


}
// async conversion(){
//     let conversionEndPoint =`https://api.frankfurter.app/latest?base=${this.fromCurr}&symbols=${toCurr}`
// }