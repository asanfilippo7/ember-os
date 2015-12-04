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
        //for the list display of all nodes, filter out all non-projects
        return this.get('store').query('node', {filter: {category: 'project'}}, query);
    },
    setupController: function(controller, model) {
        this._super.apply(this, arguments);
        var totalPages = Math.ceil(model.meta.total/model.meta.per_page);
        controller.set('totalPages', totalPages);
    },
    actions: {
        selectSearch: function(value, component, toSearch) {
            this.toSearch = value; //create a new property on the route object to store the search value
        },
        search: function(keyword) {  
            var toSearch = this.toSearch;
            if(toSearch == 1) {
                console.log('searching by tag');
                this.transitionTo('nodes.tag', keyword, {queryParams: {page: 1}});
            } else if(toSearch == 2) {
                this.transitionTo('nodes.title', keyword, {queryParams: {page: 1}});
            } else if(toSearch == 3) {
                console.log('searching by contributor');
                this.transitionTo('users.name', keyword, {queryParams: {page: 1}});
            } else {
                return;
            }
        }
    }
});
