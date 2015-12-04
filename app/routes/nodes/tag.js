import Ember from 'ember';

export default Ember.Route.extend({
    queryParams: {
        pg: {
            refreshModel: true
        }
    },
     model: function(params) {
        console.log('tag route params', params);
        var query = {};
        
        if(Ember.isPresent(params.pg)) {
            query.page = params.pg;
        }
        return this.get('store').query('node', {filter: {tags: params.tag_id,}, page: query.page});
    },
    setupController: function(controller, model) {
        this._super.apply(this, arguments);
        var totalPages = Math.ceil(model.meta.total/model.meta.per_page);
        controller.set('totalPages', totalPages);
        controller.set('tagID', model.query.filter.tags);
    }
});
