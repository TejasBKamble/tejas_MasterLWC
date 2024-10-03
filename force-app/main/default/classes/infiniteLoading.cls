public with sharing class infiniteLoading {
    @AuraEnabled(cacheable=true)
    public static list<Account> LoadeRacordByID(){

        return[select id,Name,Industry,Rating from Account order by Id,Name limit 5];
       
    }

    @AuraEnabled(cacheable=true)
    public static list<Account> LoadeMoreData(String lastid,String lastName){

        return[Select id,Name,Industry,Rating from Account 
        where (Name > :lastName) OR (Name = :lastName AND Id > :lastid)
        order by Id,Name limit 5];

    }
}