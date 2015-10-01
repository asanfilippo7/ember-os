import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    isNewSerializerAPI: true,
    
    normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
        var normalizedRecords = [];
    
        payload.data.map(function(record) {
            record.type = primaryModelClass.modelName;
            record.title = record.attributes.title;
            record.dateCreated = record.attributes.date_created;
            normalizedRecords.push(record);
        });
        
        var obj = {};
        obj[primaryModelClass.modelName] = normalizedRecords;
        
        return this._super(store, primaryModelClass, obj, id, requestType);
    }
});
