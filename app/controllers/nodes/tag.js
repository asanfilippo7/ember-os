import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: [
        'pge',
    ],
    
    pge: 1,
    
    totalPages: null,
    
    prevPage: function() {
        return this.get('pge') - 1;
    }.property('pge'),
    
    nextPage: function() {
        return this.get('pge') + 1;
    }.property('pge'),
    
    isFirstPage: function() {
        return this.get('pge') == 1;
    }.property('pge'),
    
    isLastPage: function() {
        return this.get('pge') >= this.get('totalPages');
    }.property('pge', 'totalPages'),
    
    pageRange: function() {
        var result = Ember.A();
        
        for(var i = 1; i <= this.get('totalPages'); i++) {
            result.push(i);
        }
        return result;
    }.property('totalPages')
});
