import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
    },
    model: function() {
//        The issue here is with 2-word strings: they render in the browser url with % for spaces
        console.log('tag route called');
        var hrf = window.location.href;
        var tagId = hrf.substr(hrf.lastIndexOf('/')+ 1);
        var store = this.store;
        return store.filter('node', function(node) {
            var tagArray = node.get('tags').content.currentState;
            if(tagArray.length > 0) {
                for (var i = 0; i < tagArray.length; i++) {
                    if(tagArray[i].id === tagId) {
                        console.log(tagArray[i]);
                        return node;
                    }
                }
            }
        });
    }
});

//        var url = 'https://api.osf.io/v2/nodes/?filter[tags]='+params.tag_id;
//        var returnArray = [];
//        var toReturn = Ember.$.getJSON(url, function() {
//            console.log("getting the json");
//        }).done(function() {
//            console.log(toReturn.responseJSON);
//            returnArray = toReturn.responseJSON;
//        }).always(function() {
//            console.log("Request complete. The return array is " + returnArray.data);
//            return returnArray;
//        });
//        return Ember.$.getJSON(url).then(function(data) {
//            returnArray = data;
//            console.log(returnArray);
//            return returnArray;
//        });

//    setupController: function (controller, model) {
//        console.log('tag route called');
//        var hrf = window.location.href;
//        var tagId = hrf.substr(hrf.lastIndexOf('/')+ 1);
//        var theNodes = this.modelFor('nodes');
//        controller.set("tagId", tagId);
//        console.log(controller.set("model", theNodes));
//    }
