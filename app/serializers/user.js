import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    attrs: {
        nodes: {embedded: 'always'}
    },
    
    normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
        console.log("getting user array");
        var normalizedRecords = [];
    
        payload.data.map(function(record) {
            record.type = primaryModelClass.modelName;
            record.fullName = record.attributes.full_name;
            record.givenName = record.attributes.given_name;
            record.familyName = record.attributes.family_name;
            delete record.attributes;
            
            //Weird stuff going on here: Use a links object for async data in array response...
            record.links.nodes = record.relationships.nodes.links.related.href;
            delete record.relationships;
            console.log(record);
            normalizedRecords.push(record);
        });
        var obj = {};
        obj[primaryModelClass.modelName] = normalizedRecords;
        obj.meta = payload.links.meta;
        console.log(obj);
            
        return this._super(store, primaryModelClass, obj, id, requestType);
    },
    
    normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
        console.log('normalizing single user');
        var objID = payload.data.id;
        var fn = payload.data.attributes.full_name;
        var gn = payload.data.attributes.given_name;
        var fmn = payload.data.attributes.family_name;
        
//        ...but a relationships object for async data in a single response
        var rltns = {"nodes": {"links": {"related": payload.data.relationships.nodes.links.related.href}}};
        var obj = {id: objID, type: "user", attributes: {fullName: fn, givenName: gn, familyName: fmn}, relationships: rltns};
        payload.data = obj;
        return payload;
    },
    
    normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType) {
        console.log('normalizing single user from store');
        var objID = payload.data.id;
        var fn = payload.data.attributes.full_name;
        var gn = payload.data.attributes.given_name;
        var fmn = payload.data.attributes.family_name;
        
//        ...but a relationships object for async data in a single response
        var rltns = {"nodes": {"links": {"related": payload.data.relationships.nodes.links.related.href}}};
        var obj = {id: objID, type: "user", attributes: {fullName: fn, givenName: gn, familyName: fmn}, relationships: rltns};
        payload.data = obj;
        console.log(payload);
        return payload;
    }

});