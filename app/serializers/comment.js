import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    attrs: {

    },
    
    normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
        console.log('getting comments');
        var normalizedRecords = [];
    
        payload.data.map(function(record) {
            record.type = primaryModelClass.modelName;
            record.content = record.attributes.content;
            record.dateCreated = record.attributes.date_created;
            delete record.attributes;
            
            record.links.node = record.relationships.node.links.related.href;
            record.links.user = record.relationships.user.links.related.href;
            record.links.replies = record.relationships.replies.links.self.href;
            
            var trl = record.relationships.target.links.related;
            if(trl.meta.type == "comments") {
                console.log('this comment is a reply');
                record.links.target = trl.href;
            }
            delete record.relationships;
            
            normalizedRecords.push(record);
        });
        var obj = {};
        obj[primaryModelClass.modelName] = normalizedRecords;
        obj.meta = payload.links.meta;

        console.log(obj);
        return this._super(store, primaryModelClass, obj, id, requestType);
    },
});
