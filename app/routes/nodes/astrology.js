import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return this.store.filter('node', function(node) {
            return Ember.$.inArray("astrology", node.get('tags'));
        });
    },
    renderTemplate(controller, model) {
        this.render('nodes.astrology', { model: model });
    }
});