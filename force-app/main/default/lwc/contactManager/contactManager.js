import { LightningElement, track } from 'lwc';
import createContact from '@salesforce/apex/ContactManager.createContact';
import deleteContact from '@salesforce/apex/ContactManager.deleteContact';

export default class ContactManager extends LightningElement {
    @track contacts = [];
    columns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Email', fieldName: 'Email' }
    ];

    get isDeleteDisabled() {
        return this.contacts.length <= 1;
    }

    addContact() {
        createContact()
            .then((result) => {
                this.contacts = [...this.contacts, result];
            })
            .catch((error) => {
                console.error('Error creating contact: ', error);
            });
    }

    deleteContact() {
        if (this.contacts.length > 0) {
            const contactToDelete = this.contacts[this.contacts.length - 1];
            deleteContact({ contactId: contactToDelete.id })
                .then(() => {
                    this.contacts = this.contacts.slice(0, -1); // Remove last contact from array
                })
                .catch((error) => {
                    console.error('Error deleting contact: ', error);
                });
        }
    }
}
