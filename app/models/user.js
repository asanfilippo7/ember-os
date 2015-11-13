import DS from 'ember-data';

export default DS.Model.extend({
  nodes: DS.hasMany('node', {async: true}),
    fullName: DS.attr('string'),
    givenName: DS.attr('string'),
    familyName: DS.attr('string'),
    contributor: DS.belongsTo('contributor', {async: true})
});
