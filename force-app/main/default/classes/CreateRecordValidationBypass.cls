public with sharing class CreateRecordValidationBypass {
        
        @AuraEnabled
       public static String ACCinsertRecord(Map<String, Object> AccRecord) {
        try {
            // Convert the map to an Account sObject
            Account acc = new Account(
                Name = (String) AccRecord.get('Name'),
                Phone = (String) AccRecord.get('Phone'),
                Email__c = (String) AccRecord.get('Email__c')
            );

            // Set DML options to allow partial success
            Database.DMLOptions options = new Database.DMLOptions();
            options.AllowFieldTruncation = true;
            options.OptAllOrNone = false;
    
              // Insert the record using Database.insert() to respect the DMLOptions
              Database.SaveResult[] results = Database.insert(new Account[] { acc }, options);

              // Check the result of the insert operation
              if (results[0].isSuccess()) {
                  return 'Record created successfully with ID: ' + results[0].getId();
              } else {
                return 'Error inserting record: ' + results[0].getErrors()[0].getMessage();
              }

        } catch (Exception e) {
            // Handle any errors and return a meaningful message
            throw new AuraHandledException('Error inserting record: ' + e.getMessage());
        }
      }
    
        @AuraEnabled
        public static String updateRecord(Account updatedRecord) {
            try {
                // Update the record
                update updatedRecord;
                return 'Record updated successfully';
            } catch (Exception e) {
                throw new AuraHandledException('Error updating record: ' + e.getMessage());
            }
        }
     
}


