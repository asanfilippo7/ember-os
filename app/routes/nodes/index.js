import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        console.log("index route running");
        return this.modelFor('nodes');
    }
});
