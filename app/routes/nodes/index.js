import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return this.modelFor('nodes');
    }
//    setupController: function(controller, node) {
//        controller.set('model', node);
//    }
});
