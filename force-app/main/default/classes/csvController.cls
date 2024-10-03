public with sharing class csvController {

    @AuraEnabled(cacheable=true)
  
    public static list<Account> accountRacords(){
        return[select Id,Name,Industry,Phone from Account];
    }
}