import Ember from 'ember';

export default Ember.Controller.extend({
    tagList: function() {
        return this.store.peekAll('tag');
    }.property('model.tagList'),
    allWithTag: function(tag) {
        return this.store.query('node', {filter: {tags: tag.id}});
    }.property('model.allWithTag')
});
