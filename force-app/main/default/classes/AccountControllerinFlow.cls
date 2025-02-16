public with sharing class AccountControllerinFlow {
    @InvocableMethod(label='Get Accounts')
  
    public static List< Account > getAccountsinFlow() { 

        try {
            return [ SELECT Id, Name, Industry FROM Account LIMIT 10 ]; 
        } catch (Exception e) {
            // Log exception or handle as needed
            throw new AuraHandledException('Error fetching accounts: ' + e.getMessage());
        }
        
    } 
}

