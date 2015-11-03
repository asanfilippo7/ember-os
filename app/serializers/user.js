import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    attrs: {
        nodes: {embedded: 'always'}
    },
    
    normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
        var normalizedRecords = [];
    
        payload.data.map(function(record) {
            record.type = primaryModelClass.modelName;
            record.fullName = record.attributes.full_name;
            record.givenName = record.attributes.given_name;
            record.familyName = record.attributes.family_name;
            record.links.nodes = record.relationships.nodes.links.related.href;
            normalizedRecords.push(record);
        });
        var obj = {};
        obj[primaryModelClass.modelName] = normalizedRecords;
        obj.meta = payload.links.meta;
        
        return this._super(store, primaryModelClass, obj, id, requestType);
    },
    
    normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType) {
        console.log("getting payload");
        payload.data.type = primaryModelClass.modelName;
        console.log(payload);
        return payload;
    }
});
