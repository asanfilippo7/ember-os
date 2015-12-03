import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    attrs: {
        user: {embedded: 'always'}
    },
    
    normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
        var normalizedRecords = [];
    
        payload.data.map(function(record) {
            record.type = primaryModelClass.modelName;
            record.links.user = record.embeds.users.data.links.self;
            normalizedRecords.push(record);
        });
        var obj = {};
        obj[primaryModelClass.modelName] = normalizedRecords;
        obj.meta = payload.links.meta;
        
        return this._super(store, primaryModelClass, obj, id, requestType);
    }
});
