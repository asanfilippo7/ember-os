import Ember from 'ember';

export default Ember.Controller.extend({
    queryParams: [
        'pg',
    ],
    
    pg: 1,
    
    totalPages: null,
    
    prevPage: function() {
        return this.get('pg') - 1;
    }.property('pg'),
    
    nextPage: function() {
        return this.get('pg') + 1;
    }.property('pg'),
    
    isFirstPage: function() {
        return this.get('pg') == 1;
    }.property('pg'),
    
    isLastPage: function() {
        return this.get('pg') >= this.get('totalPages');
    }.property('pg', 'totalPages'),
    
    pageRange: function() {
        var result = Ember.A();
        
        for(var i = 1; i <= this.get('totalPages'); i++) {
            result.push(i);
        }
        console.log(result);
        return result;
    }.property('totalPages')
});
