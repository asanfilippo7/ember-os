import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  dateModified: DS.attr('date'),
    tags: DS.hasMany('tag'),
    contributors: DS.hasMany('user', {async: true}) 
});
