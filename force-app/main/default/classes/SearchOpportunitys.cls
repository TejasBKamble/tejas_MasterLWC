public with sharing class SearchOpportunitys {
   @AuraEnabled(cacheable=true)
   public static list<Opportunity> getOpportunitys(string oppName){
    string SearchName='%'+oppName+'%';
    return[Select id,Name,Amount from Opportunity Where Name LIKE:SearchName LIMIT 10];
   }

} 