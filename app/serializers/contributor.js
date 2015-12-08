import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    attrs: {
//        user: {embedded: 'always'}
    },
    
    normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
        
        function getNext(theArrayPassed, theNewArray) {
            console.log('get next running');
            if(theArrayPassed.links.next) {
                var theOtherJSON = $.getJSON(theArrayPassed.links.next, function(returnedArray) {
                    returnedArray.data.map(function(arrayObj) {
                        theNewArray.push(arrayObj);
                    });
                    getNext(returnedArray, theNewArray);
                });
            }
            else {
                console.log('no more next!')
                var arr = [];
                theNewArray.map(function(record) {
                    record.type = primaryModelClass.modelName;
                    record.links.user = record.embeds.users.data.links.self;
                    arr.push(record);
                });
            }
            console.log('about to return ', arr);
            return arr;
        }
        
        console.log('normalizing contributor response');
        var normalizedRecords = [];
        
//        var theData = payload.data;
//        var nr = [];
//        console.log(getNext(payload, theData));
        
        
        payload.data.map(function(record) {
            record.type = primaryModelClass.modelName;
            record.links.user = record.embeds.users.data.links.self;
            normalizedRecords.push(record);
        });
        console.log('normalized records', normalizedRecords);
        
        var obj = {};
        obj[primaryModelClass.modelName] = normalizedRecords;
        obj.meta = payload.links.meta;
                                         
        return this._super(store, primaryModelClass, obj, id, requestType);
    }
});
