import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        console.log('user route running');
        return this.store.find('user', params.user_id);
    }
});
