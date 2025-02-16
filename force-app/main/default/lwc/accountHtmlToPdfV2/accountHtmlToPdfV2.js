import { LightningElement,track } from 'lwc';
//import getStyleSheetOptions from '@salesforce/apex/ContentDocumentController.getContentDocuments';
import getStyleSheetOptions from '@salesforce/apex/DocumentController.getStyleSheetOptions';
import generatePdfAndSave from '@salesforce/apex/ConvertApiController.generatePdfAndSave';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class AccountHtmlToPdfV2 extends LightningElement {
    @track accountName = '';
    @track accountDescription = '';
    @track selectedStyleSheet = '';
    @track stylesheetOptions = [];
    @track pdfUrl;
    @track fileId;

    connectedCallback() {
        // Get stylesheets from Salesforce Document Object
        this.loadStyleSheetOptions();
    }

    // Load available stylesheets from the Document object (Apex callout)
    loadStyleSheetOptions() {
        getStyleSheetOptions()
            .then((result) => {
                this.stylesheetOptions = result.map(doc => ({ label: doc.Title, value: doc.Id }));
            })
            .catch((error) => {
                this.showToast('Error', 'Failed to load stylesheets', 'error');
              
            });
    }

    // Handle Account Data Inputs
    handleInputChange(event) {
        const field = event.target.dataset.id;
        if (field === 'accountName') {
            this.accountName = event.target.value;
        } else if (field === 'accountDescription') {
            this.accountDescription = event.target.value;
        }
    }

    // Handle Stylesheet Selection
    handleStyleSheetChange(event) {
        this.selectedStyleSheet = event.target.value;
    }

    // Handle PDF Generation
    handleGeneratePDF() {
        const htmlContent = this.createHtmlContent();

        // Call the Apex method to generate PDF and save it
        generatePdfAndSave({ htmlContent, styleSheetId: this.selectedStyleSheet })
            .then((result) => {
                this.pdfUrl = result.pdfUrl;
                this.fileId = result.fileId;
                this.showToast('Success', 'PDF generated and saved successfully', 'success');
            })
            .catch((error) => {
                this.showToast('Error', 'Failed to generate PDF', 'error');
                console.log('Error in Genarating PDF ',error);
            });
    }

    // Create HTML content with Account Data and selected stylesheet
    createHtmlContent() {
        return `
            <html>
                <head>
                    <style>${this.selectedStyleSheet}</style>
                </head>
                <body>
                    <h1>Account Name: ${this.accountName}</h1>
                    <p>Description: ${this.accountDescription}</p>
                </body>
            </html>
        `;
    }

    // Show toast message
    showToast(title, message, variant) {
        const event = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(event);
    }
}