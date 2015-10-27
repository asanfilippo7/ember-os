import Ember from 'ember';

export default Ember.Route.extend({
    model:function(params) {
        console.log('tag route running');
        return this.store.query('node', {filter: {tags: params.tag_id}});
    }
//    model: function(params) {
//        console.log('tag route running');
//        var tagId = params.tag_id;
//        var store = this.store;
//        return store.filter('node', function(node) {
//            var tagArray = node.get('tags').content.currentState;
//            if(tagArray.length > 0) {
//                for (var i = 0; i < tagArray.length; i++) {
//                    if(tagArray[i].id === tagId) {
//                        return node;
//                    }
//                }
//            }
//        });
//    }
});
