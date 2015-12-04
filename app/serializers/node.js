import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
    attrs: {
        tags: {embedded: 'always'},
//        contributors: {embedded: 'always'}
    },
    
    normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
        console.log('getting nodes');
        var normalizedRecords = [];
    
        payload.data.map(function(record) {
            record.type = primaryModelClass.modelName;
            record.title = record.attributes.title;
            record.dateModified = record.attributes.date_modified;
            record.category = record.attributes.category;
            record.tags = record.attributes.tags;
            delete record.attributes;
            
            //Weird stuff going on here: Use a links object for async data in array response...
            //Also strange: tags can be directly loaded in an array response, but must be sideloaded in a single record response...
            record.links.contributors = record.relationships.contributors.links.related.href;
            record.links.comments = record.relationships.comments.links.related.href;
            record.links.children = record.relationships.children.links.related.href;
            var prl = record.relationships.parent;
            if(prl != undefined) {
                record.links.parent = prl.links.related.href;
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
    
    normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType) {
        console.log("getting single node from store");
        
        var objID = payload.data.id;
        var tl = payload.data.attributes.title;
        var dm = payload.data.attributes.date_modified;
        var ct = payload.data.attributes.category;
        
        //...but a relationships object for async data in a single response
        //ALSO: side-load tags in a single response (put them in the relationship and included) with tags as async: false hasMany         
        var normalizedTagArray = [];
        payload.data.attributes.tags.map(function(t) {
            var nt = {type: "tag", id: t};
            normalizedTagArray.push(nt);
        });
        
        //relatively inelegant solution for checking the parent of a single node, but it works
        var prl = payload.data.relationships.parent;
        if(prl != undefined) {
            var rltns = {"contributors": {"links": {"related": payload.data.relationships.contributors.links.related.href}}, "comments": {"links": {"related": payload.data.relationships.comments.links.related.href}}, "children": {"links": {"related": payload.data.relationships.children.links.related.href}}, "parent": {"links": {"related": prl.links.related.href}}, "tags": {"data": normalizedTagArray}};
        }
        else {
            var rltns = {"contributors": {"links": {"related": payload.data.relationships.contributors.links.related.href}}, "comments": {"links": {"related": payload.data.relationships.comments.links.related.href}}, "children": {"links": {"related": payload.data.relationships.children.links.related.href}}, "tags": {"data": normalizedTagArray}};
        }
        
        var obj = {id: objID, type: "node", attributes: {title: tl, dateModified: dm}, relationships: rltns};
        payload.data = obj;
        payload.included = normalizedTagArray;
        console.log(payload);
        return payload;
    },
    
    normalizeSingleResponse(store, primaryModelClass, payload, id, requestType) {
        console.log("getting single node");
        var objID = payload.data.id;
        var tl = payload.data.attributes.title;
        var dm = payload.data.attributes.date_modified;
        var ct = payload.data.attributes.category;
        
        //...but a relationships object for async data in a single response
        //ALSO: side-load tags in a single response (put them in the relationship and included) with tags as async: false hasMany 
         var normalizedTagArray = [];
        payload.data.attributes.tags.map(function(t) {
            var nt = {type: "tag", id: t};
            normalizedTagArray.push(nt);
        });
        
        //relatively inelegant solution for checking the parent of a single node, but it works
        var prl = payload.data.relationships.parent;
        if(prl != undefined) {
            var rltns = {"contributors": {"links": {"related": payload.data.relationships.contributors.links.related.href}}, "comments": {"links": {"related": payload.data.relationships.comments.links.related.href}}, "children": {"links": {"related": payload.data.relationships.children.links.related.href}}, "parent": {"links": {"related": prl.links.related.href}}, "tags": {"data": normalizedTagArray}};
        }
        else {
            var rltns = {"contributors": {"links": {"related": payload.data.relationships.contributors.links.related.href}}, "comments": {"links": {"related": payload.data.relationships.comments.links.related.href}}, "children": {"links": {"related": payload.data.relationships.children.links.related.href}}, "tags": {"data": normalizedTagArray}};
        }
        
        var obj = {id: objID, type: "node", attributes: {title: tl, dateModified: dm}, relationships: rltns};
        payload.data = obj;
        payload.included = normalizedTagArray;
        return payload;
    }
});
