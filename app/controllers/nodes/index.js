import Ember from 'ember';

export default Ember.Controller.extend({
    tagList: function() {
        return this.store.peekAll('tag');
    }.property('model.tagList')
});
