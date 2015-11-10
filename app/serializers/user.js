import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    attrs: {
        nodes: {embedded: 'always'}
    },
    
    normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
        var objID = payload.data.id;
        var fn = payload.data.attributes.full_name;
        var gn = payload.data.attributes.given_name;
        var fmn = payload.data.attributes.family_name;
        var lnks = {"nodes": payload.data.relationships.nodes.links.related.href};
        var obj = {id: objID, type: "user", attributes: {fullName: fn, givenName: gn, familyName: fmn}, links: lnks};
        payload.data = obj;
        return payload;
    },
    
    normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType) {
        console.log('normalizing single user from store');
        var objID = payload.data.id;
        var fn = payload.data.attributes.full_name;
        var gn = payload.data.attributes.given_name;
        var fmn = payload.data.attributes.family_name;
        var lnks = {"nodes": payload.data.relationships.nodes.links.related.href};
        var obj = {id: objID, type: "user", attributes: {fullName: fn, givenName: gn, familyName: fmn}, links: lnks};
        payload.data = obj;
        console.log(payload);
        return payload;
    }
});



//    normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
//        console.log("getting user array");
//        var normalizedRecords = [];
//    
//        payload.data.map(function(record) {
//            console.log(record);
//            record.type = primaryModelClass.modelName;
//            record.fullName = record.attributes.full_name;
//            record.givenName = record.attributes.given_name;
//            record.familyName = record.attributes.family_name;
//            record.links.nodes = record.relationships.nodes.links.related.href;
//            normalizedRecords.push(record);
//        });
//        var obj = {};
//        obj[primaryModelClass.modelName] = normalizedRecords;
//        obj.meta = payload.links.meta;
//        
//        return this._super(store, primaryModelClass, obj, id, requestType);
//    },

//    normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType) {
//        console.log("getting single user");
//        payload.data.type = primaryModelClass.modelName;
//        return payload;
//    }