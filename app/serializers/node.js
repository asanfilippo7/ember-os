import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
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
            delete record.attributes;
//            Weird stuff going on here: Use a links object for async data in array response...
            record.links.contributors = record.relationships.contributors.links.related.href;
            delete record.relationships;
            normalizedRecords.push(record);
        });
        var obj = {};
        obj[primaryModelClass.modelName] = normalizedRecords;
        obj.meta = payload.links.meta;

        return this._super(store, primaryModelClass, obj, id, requestType);
    },
    
    normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType) {
        console.log("getting single node from store");
        var objID = payload.data.id;
        var tl = payload.data.attributes.title;
        var dm = payload.data.attributes.date_modified;
        var tgs = payload.data.attributes.tags;
//        ...but a relationships object for async data in a single response
        var rltns = {"contributors": {"links": {"related": payload.data.relationships.contributors.links.related.href}}};
        var obj = {id: objID, type: "node", attributes: {title: tl, dateModified: dm, tags: tgs}, relationships: rltns};
        payload.data = obj;
        console.log(payload);
        return payload;
    },
    
    normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
        console.log("getting single node");
        var objID = payload.data.id;
        var tl = payload.data.attributes.title;
        var dm = payload.data.attributes.date_modified;
        var tgs = payload.data.attributes.tags;
//        ...but a relationships object for async data in a single response
        var rltns = {"contributors": {"links": {"related": payload.data.relationships.contributors.links.related.href}}};
        var obj = {id: objID, type: "node", attributes: {title: tl, dateModified: dm, tags: tgs}, relationships: rltns};
        payload.data = obj;
        return payload;
    }
});
