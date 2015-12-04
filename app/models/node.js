import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  dateModified: DS.attr('date'),
    category: DS.attr('string'),
    tags: DS.hasMany('tag', {async: false}),
    contributors: DS.hasMany('contributor', {async: true}),
    users: DS.hasMany('user'),
    comments: DS.hasMany('comment', {async: true}),
    children: DS.hasMany('node', {async: true, inverse: 'parent'}),
    parent: DS.belongsTo('node', {async: true})
});
