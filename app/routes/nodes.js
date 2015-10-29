import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        page: {
            refreshModel: true
        }
    },
    model: function(params) {
        var query = {};
        
        if(Ember.isPresent(params.page)) {
            query.page = params.page;
        }
        return this.get('store').query('node', query);
    },
    setupController: function(controller, model) {
        this._super.apply(this, arguments);
        controller.set('totalPages', model.get('meta.totalPages'));
    },
});
