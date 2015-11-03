import Ember from 'ember';

export default Ember.Route.extend({
    model: function() {
        console.log('users route running');
        return this.store.findAll('user');
    }
});
