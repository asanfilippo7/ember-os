import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
    isNewSerializerAPI: true,
    
    attrs: {
        tags: {embedded: 'always'},
        contributors: {embedded: 'always'}
    },
    
    normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
        var normalizedRecords = [];
    
        payload.data.map(function(record) {
            record.type = primaryModelClass.modelName;
            record.title = record.attributes.title;
            record.dateModified = record.attributes.date_modified;
            record.tags = record.attributes.tags;
            console.log(record);
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
        return payload;
    }
});
