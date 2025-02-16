public with sharing class ContactManager {
    @AuraEnabled
    public static Contact createContact(String lastName, String phone) {
        Contact newContact = new Contact(
            LastName = lastName,
            Phone = phone
        );
        insert newContact;
        return newContact;
    }

    @AuraEnabled
    public static void deleteContact(Id contactId) {
        Contact contactToDelete = [SELECT Id FROM Contact WHERE Id = :contactId LIMIT 1];
        delete contactToDelete;
    }
}