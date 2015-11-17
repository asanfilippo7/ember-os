import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  dateModified: DS.attr('date'),
    tags: DS.hasMany('tag', {async: false}),
    contributors: DS.hasMany('contributor', {async: true}),
    users: DS.hasMany('user')
});
