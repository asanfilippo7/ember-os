import Ember from 'ember';

export default Ember.Route.extend({
    controllerName: 'nodes',
    toSearch: '',
    
    model() {
        console.log("index route running");
        return this.modelFor('nodes');
    }
});
