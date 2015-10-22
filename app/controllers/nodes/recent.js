import Ember from 'ember';

export default Ember.Controller.extend({
    sortProperty: ['dateCreated:desc'],
    sortedByDate: Ember.computed.sort('model', 'sortProperty')
});
