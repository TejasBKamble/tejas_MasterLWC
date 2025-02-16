public with sharing class GetContactsinDataTable {
    @AuraEnabled(cacheable=true)
   public static List<Contact> getContacts(){
    return [SELECT Id,Name,Phone FROM Contact LIMIT 20];
   }
}