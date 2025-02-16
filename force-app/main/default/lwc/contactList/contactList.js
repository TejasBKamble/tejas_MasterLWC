import { LightningElement, track } from 'lwc';
import createContact from '@salesforce/apex/ContactManager.createContact';
import deleteContact from '@salesforce/apex/ContactManager.deleteContact';

export default class ContactList extends LightningElement {
    @track contacts = [];
    lastName = '';
    phone = '';
    rowCount = 0;

    columns = [
        { label: 'Last Name', fieldName: 'lastName' },
        { label: 'Phone', fieldName: 'phone' },
        {
            type: 'button',
            typeAttributes: {
                label: 'Delete',
                name: 'delete',
                title: 'Delete',
                disabled: false,
                value: 'delete',
                iconPosition: 'right'
            }
        }
    ];

    handleLastNameChange(event) {
        this.lastName = event.target.value;
    }

    handlePhoneChange(event) {
        this.phone = event.target.value;
    }

    addContact() {
        if (this.lastName && this.phone) {
            createContact({ lastName: this.lastName, phone: this.phone })
                .then((result) => {
                    this.rowCount++;
                    const newContact = {
                        id: result.Id,
                        lastName: result.LastName,
                        phone: result.Phone
                    };
                    this.contacts = [...this.contacts, newContact];
                    this.lastName = '';
                    this.phone = '';
                })
                .catch((error) => {
                    console.error('Error creating contact: ', error);
                });
        } else {
            alert('Please enter both Last Name and Phone number.');
        }
    }

    handleDelete(event) {
        const contactId = event.detail.row.id;
        deleteContact({ contactId: contactId })
            .then(() => {
                this.contacts = this.contacts.filter(contact => contact.id !== contactId);
            })
            .catch((error) => {
                console.error('Error deleting contact: ', error);
            });
    }
}
