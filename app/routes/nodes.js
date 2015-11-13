import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        page: {
            refreshModel: true
        }
    },
    model: function(params) {
        console.log('nodes route running');
        var query = {};
        
        if(Ember.isPresent(params.page)) {
            query.page = params.page;
        }
        return this.get('store').query('node', query);
    },
    setupController: function(controller, model) {
        this._super.apply(this, arguments);
        var totalPages = Math.ceil(model.meta.total/model.meta.per_page);
        controller.set('totalPages', totalPages);
    },
});
