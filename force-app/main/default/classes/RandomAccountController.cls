public with sharing class RandomAccountController {
    @AuraEnabled(cacheable=true)
    public static List<Account> getRandomAccounts() {
        List<Account> allAccounts = [SELECT Id, Name FROM Account LIMIT 20];
        allAccounts.shuffle();
        return allAccounts.size() > 3 ? allAccounts.subList(0, 3) : allAccounts;
    }
}

// Get the total count of Account records 

Integer count = [SELECT COUNT() FROM Account]; 

  

// Generate a random number within the range of the total number of Account records 

Integer rand = Math.floor(Math.random() * count).intValue(); 

  

// Query for 3 random Account records, using the OFFSET to get a random starting point 

List<Account> randomAccounts = [SELECT Id, Name FROM Account LIMIT 3 OFFSET :rand]; 

  

// Debug the result 

System.debug('<<<<<<<<<Random Accounts>>>>>>>>>' + randomAccounts); 

trigger AcciuntConPhoneUpdate on Account (before update) {
  
  Set<Id> accId = new Set<Id>();
  for (Account ac : Trigger.new) {
      if (ac.Phone != Trigger.oldMap.get(ac.Id).Phone) {
          accId.add(ac.Id); // Add AccountId to the set if Phone has changed
      }
  }
  if (!accId.isEmpty()) {
      List<Contact> contactToUpdate = [SELECT Id, AccountId FROM Contact WHERE AccountId IN :accId];

      // Create a map to associate AccountId with Phone
      Map<Id, String> accountPhoneMap = new Map<Id, String>();

      // Loop through the Account records to build a map of AccountId to Phone
      for (Account a : Trigger.new) {
          if (a.Phone != null) {
              accountPhoneMap.put(a.Id, a.Phone);
          }
      }
      // Loop through the Contacts and set their Phone field using the map
      for (Contact cc : contactToUpdate) {
          if (accountPhoneMap.containsKey(cc.AccountId)) {
              cc.Phone = accountPhoneMap.get(cc.AccountId);
          }
      }
   update contactToUpdate;  
  }
      
}


=================================================  update Active Contact Count to Account ==========================

trigger UpdateActiveContactsCount on Contact (after insert, after update, after delete, after undelete) {
    
    // Helper method to update the account's active contact count
    private static void updateActiveContactCount(Set<Id> accountIds) {
        // Query Accounts to get related active contact count
        List<Account> accountsToUpdate = [SELECT Id, Number_of_Active_Contacts__c,
                                              (SELECT Id, IsActive__c FROM Contacts WHERE IsActive__c = TRUE)
                                           FROM Account WHERE Id IN :accountIds];
        
        // Loop through each account and update the active contact count
        for (Account acct : accountsToUpdate) {
            Integer activeCount = acct.Contacts.size();
            acct.Number_of_Active_Contacts__c = activeCount;
        }
        
        // Update the accounts with the new active contact count
        if (!accountsToUpdate.isEmpty()) {
            update accountsToUpdate;
        }
    }

    // After insert, update, and undelete
    if (Trigger.isInsert || Trigger.isUpdate || Trigger.isUndelete) {
        Set<Id> accountIds = new Set<Id>();
        
        // Collect Account Ids from the affected contacts
        for (Contact con : Trigger.new) {
            if (con.AccountId != null) {
                accountIds.add(con.AccountId);
            }
        }
        
        // Call the helper method to update the active contact count
        updateActiveContactCount(accountIds);
    }

    // After delete
    if (Trigger.isDelete) {
        Set<Id> accountIds = new Set<Id>();
        
        // Collect Account Ids from the deleted contacts
        for (Contact con : Trigger.old) {
            if (con.AccountId != null) {
                accountIds.add(con.AccountId);
            }
        }
        
        // Call the helper method to update the active contact count
        updateActiveContactCount(accountIds);
    }
}

