import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
    isNewSerializerAPI: true,
    
    attrs: {
        tags: {embedded: 'always'}
    },
    
    normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
        var normalizedRecords = [];
    
        payload.data.map(function(record) {
            record.type = primaryModelClass.modelName;
            record.title = record.attributes.title;
            record.dateCreated = record.attributes.date_created;
            record.tags = record.attributes.tags;
            normalizedRecords.push(record);
        });
        
        var obj = {};
        obj[primaryModelClass.modelName] = normalizedRecords;
        
        return this._super(store, primaryModelClass, obj, id, requestType);
    },
    
    normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType) {
        console.log("getting payload");
        payload.data.type = primaryModelClass.modelName;
        return payload;
    }
});
