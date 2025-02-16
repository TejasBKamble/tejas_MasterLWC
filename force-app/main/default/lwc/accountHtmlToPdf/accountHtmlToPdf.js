import { LightningElement } from 'lwc';
import savePdf from '@salesforce/apex/PdfGeneratorController.savePdf'; // Apex controller method to save PDF
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class AccountHtmlToPdf extends LightningElement {
    accountName = '';
    accountDescription = '';
    selectedStyleSheet = '';
    stylesheetOptions = [
        { label: 'Style 1', value: 'style1' },
        { label: 'Style 2', value: 'style2' },
        { label: 'Style 3', value: 'style3' }
    ];

    handleInputChange(event) {
        const field = event.target.dataset.id;
        if (field === 'accountName') {
            this.accountName = event.target.value;
        } else if (field === 'accountDescription') {
            this.accountDescription = event.target.value;
        }
    }

    handleStyleSheetChange(event) {
        this.selectedStyleSheet = event.target.value;
    }

    handleGeneratePDF() {
        const htmlContent = this.createHtmlContent();
        const stylesheet = this.getStylesheet(this.selectedStyleSheet);

        // Call Apex method to handle PDF generation and saving
        savePdf({ htmlContent, stylesheet })
            .then((result) => {
                this.showToast('Success', 'PDF generated and saved successfully', 'success');
            })
            .catch((error) => {
                this.showToast('Error', 'Failed to generate PDF', 'error');
                console.log('Error in Generating PDF',error);
            });
    }

    // Construct HTML content
    createHtmlContent() {
        return `
            <html>
                <head>
                    <style>${this.getStylesheet(this.selectedStyleSheet)}</style>
                </head>
                <body>
                    <h1>Account Name: ${this.accountName}</h1>
                    <p>Description: ${this.accountDescription}</p>
                </body>
            </html>
        `;
    }

    // Get Stylesheet based on selection
    getStylesheet(styleName) {
        const styles = {
            'style1': 'h1 { color: blue; } p { color: green; }',
            'style2': 'h1 { color: red; } p { color: yellow; }',
            'style3': 'h1 { color: purple; } p { color: orange; }'
        };
        return styles[styleName] || '';
    }

    // Show Toast Notification
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(event);
    }
}