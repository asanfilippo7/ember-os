import Ember from 'ember';

export default Ember.Controller.extend({
    tagID: function() {
        var href = window.location.href;
        var theID = href.substr(href.lastIndexOf('/') + 1).replace("%20"," ");
        return theID;
    }.property('model.tagID')
});
