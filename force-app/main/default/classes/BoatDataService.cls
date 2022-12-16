public with sharing class BoatDataService {
    @AuraEnabled(cacheable = true)
    public static List<Boat__c> getBoats(String boatTypeId){
        List<Boat__c> listOfBoats = [
            SELECT Name, 
            BoatType__c, 
            Contact__c,
            Description__c,
            Geolocation__c, 
            Length__c, 
            Picture__c, 
            Year_Built__c, 
            BoatType__r.Name,
            Contact__r.Name
            FROM Boat__c
        ];
        if(boatTypeId == null){
            listOfBoats = [
            SELECT Name, 
            BoatType__c, 
            Contact__c,
            Description__c,
            Geolocation__c, 
            Length__c, 
            Picture__c, 
            Year_Built__c, 
            BoatType__r.Name,
            Contact__r.Name
            FROM Boat__c
            WHERE BoatType__c = :boatTypeId WITH SECURITY_ENFORCED
            ];
        }
        return listOfBoats;
    }
}
