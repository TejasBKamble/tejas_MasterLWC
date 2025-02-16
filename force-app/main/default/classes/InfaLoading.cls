public with sharing class InfaLoading {
    @AuraEnabled(cacheable=true)
    public static List<Account> loadRecordById() {
        return [SELECT Id, Name, Industry, Rating, Phone FROM Account ORDER BY Id, Name LIMIT 5]; // Reduced limit for testing
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> loadMoreData(String lastId, String lastName) {
        return [SELECT Id, Name, Industry, Rating, Phone FROM Account 
                WHERE (Name > :lastName) OR (Name = :lastName AND Id > :lastId)
                ORDER BY Id, Name LIMIT 5]; // Reduced limit for testing
    }

    @AuraEnabled(cacheable=true)
    public static Integer countAccount() {
        AggregateResult agr = [SELECT COUNT(Id) recCount FROM Account];
        return (Integer)agr.get('recCount');
    }
}