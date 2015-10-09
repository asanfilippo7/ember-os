import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        console.log("route running");
        return this.store.find('node', params.node_id);
    }
});
