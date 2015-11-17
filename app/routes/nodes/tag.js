import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        pge: {
            refreshModel: true
        }
    },
     model: function(params) {
        var query = {};
        
        if(Ember.isPresent(params.pge)) {
            query.page = params.pge;
        }
        return this.get('store').query('node', {filter: {tags: params.tag_id}, page: query.page});
    },
    setupController: function(controller, model) {
        this._super.apply(this, arguments);
        var totalPages = Math.ceil(model.meta.total/model.meta.per_page);
        controller.set('totalPages', totalPages);
        controller.set('tagID', model.query.filter.tags);
    }
});
