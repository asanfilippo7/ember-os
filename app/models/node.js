import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  dateCreated: DS.attr('date'),
    tags: DS.attr()
});
