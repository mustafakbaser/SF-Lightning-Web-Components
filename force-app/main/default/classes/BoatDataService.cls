public with sharing class BoatDataService {

    // @AuraEnabled for getting list cacheable
    @AuraEnabled(cacheable = true)
    public static List<Boat__c> getBoats(String boatTypeId){
        List<Boat__c> listOfBoats = [
            SELECT Name,
            BoatType__c,
            Contact__c,
            //Lenght__c
            Description__c,
            Geolocation__c,
            BoatType__r.Name,
            Contact__r.Name,
            Picture__c,
            Year_Built__c
            FROM Boat__c
        ];

        // To check if empty. String.isNotBlank(boatTypeId) is an alternative of it.
        if(String.isNotBlank(boatTypeId)){
            listOfBoats = [
            SELECT Name,
            BoatType__c,
            Contact__c,
            //Lenght__c
            Description__c,
            Geolocation__c, 
            Picture__c,
            Year_Built__c,
            BoatType__r.Name,
            Contact__r.Name
            FROM Boat__c
            WHERE BoatType__c = :boatTypeId
            WITH SECURITY_ENFORCED
            ];
        }
        return listOfBoats;
    }

    // @AuraEnabled for getting list cacheable
    @AuraEnabled(cacheable = true)
    public static List<Boat__c> getSimilarBoats(Id boatId, String similarBy){
        // Initialize the listOfSimilarBoats List
        List<Boat__c> listOfSimilarBoats = new List<Boat__c>();
        List<Boat__c> listOfParentBoats = [
            SELECT Id,
            BoatType__c,
            BoatType__r.Name,
            Price__c
            //Lenght__c
            FROM Boat__c
            WHERE Id = :boatId
            WITH SECURITY_ENFORCED
        ];
        return listOfSimilarBoats;
    }
    // @AuraEnabled for getting list cacheable
    @AuraEnabled(cacheable = true)
    public static List<BoatType__c> getBoatTypes(){
        return [
            SELECT Id, Name
            FROM BoatType__c
            WITH SECURITY_ENFORCED
        ];
    }

    // @AuraEnabled for getting list cacheable
    @AuraEnabled(cacheable = true)
    public static List<BoatReview__c> getAllReviews(Id boatId){
        // Returns Comment and Rating of Boats
        return [
            SELECT Id, 
            Name, 
            Comment__c, 
            Rating__c
            FROM BoatReview__c
            WHERE Boat__c = :boatId
            WITH SECURITY_ENFORCED
        ];
    }

    // @AuraEnabled for getting list cacheable
    @AuraEnabled(cacheable = true)
    public static String getBoatsByLocation(String boatTypeId){
        String boatLocationQuery = 'SELECT Name, Geolocation__c FROM Boat__c';
        String boatLocations = boatLocationQuery;

        if(String.isNotBlank(boatTypeId)){
            boatLocations = 'SELECT Name, Geolocation__c FROM Boat__c WHERE BoatType__c = :boatTypeId WITH SECURITY_ENFORCED';
        }
        return JSON.serialize(Database.query(boatLocations));
    }
}
