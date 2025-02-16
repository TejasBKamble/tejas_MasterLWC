import { LightningElement, wire, track } from "lwc";
import { getObjectInfo, getPicklistValues } from "lightning/uiObjectInfoApi";
import getAccountList from "@salesforce/apex/AccountController.getAccounts";
import { refreshApex } from "@salesforce/apex";
import { updateRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

import NAME_FIELD from "@salesforce/schema/Account.Name";
import INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import ACCOUNT_OBJECT from "@salesforce/schema/Account";

// Columns definition (without inline editing setup initially)
const COLS = [
  {
    label: "Account Name",
    fieldName: NAME_FIELD.fieldApiName,
    editable: false
  },
  {
    label: "Industry",
    fieldName: INDUSTRY_FIELD.fieldApiName,
    editable: true,
    type: "text" // Placeholder for custom inline edit handling
  }
];

export default class AccountDatatableWithIndustryEdit extends LightningElement {
  columns = COLS;
  @track draftValues = [];
  @track industryPicklistValues = [];
  @track editingRecordId = null; // Track which record is being edited
  @track selectedIndustry = ''; // Track selected industry during editing
  @track data = [];

  @wire(getAccountList)
  accounts;

  // Get object and picklist values for 'Industry'
  @wire(getObjectInfo, { objectApiName: ACCOUNT_OBJECT })
  objectInfo;

  // Fetch picklist values for 'Industry'
  @wire(getPicklistValues, {
    recordTypeId: "$objectInfo.data.defaultRecordTypeId",
    fieldApiName: INDUSTRY_FIELD
  })
  wiredPicklistValues({ error, data }) {
    if (data) {
      this.industryPicklistValues = data.values;
      // Dynamically update columns if needed
    } else if (error) {
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Error loading picklist values",
          message: error.body.message,
          variant: "error"
        })
      );
    }
  }

  // Handle when a user starts editing
  handleEdit(event) {
    const { rowIndex, column } = event.detail;
    if (column.fieldName === INDUSTRY_FIELD.fieldApiName) {
      // Open the combobox for editing 'Industry'
      const record = this.accounts.data[rowIndex];
      this.editingRecordId = record.Id;
      this.selectedIndustry = record.Industry || '';
    }
  }

  // Handle the picklist selection
  handlePicklistChange(event) {
    this.selectedIndustry = event.target.value;
  }

  // Save the changes made to the Industry picklist
  handleSave() {
    const updatedRecord = {
      fields: {
        Id: this.editingRecordId,
        Industry: this.selectedIndustry
      }
    };

    updateRecord(updatedRecord)
      .then(() => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Success",
            message: "Account updated successfully",
            variant: "success"
          })
        );
        this.editingRecordId = null; // Reset editing state
        return refreshApex(this.accounts);
      })
      .catch((error) => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Error updating account",
            message: error.body.message,
            variant: "error"
          })
        );
      });
  }

  // Handle canceling the editing
  handleCancel() {
    this.editingRecordId = null;
  }
}
