import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        console.log("node route running");
        return this.store.findRecord('node', params.node_id);
    }
});
