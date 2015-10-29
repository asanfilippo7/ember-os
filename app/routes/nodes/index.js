import Ember from 'ember';

export default Ember.Route.extend({
    controllerName: 'nodes',
    model() {
        console.log("index route running");
        return this.modelFor('nodes');
    },
    actions: {
        search: function(keyword) {
            console.log('searching');
            this.transitionTo('nodes.tag', keyword);
        }
    }
});
