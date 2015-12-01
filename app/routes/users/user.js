import Ember from 'ember';

export default Ember.Route.extend({
    model: function(params) {
        console.log('user route running');
        return this.store.findRecord('user', params.user_id);
    },
//    actions: {
//        reName: function(newName) {
//           var changed = this.get('currentModel');
//            changed.set('givenName', newName);
//            console.log('new given name', changed.get('givenName'));
//            changed.save();
//        }
//    }
});
