import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr('string'),
    dateCreated: DS.attr('date'),
    node: DS.belongsTo('node', {async: true}),
    user: DS.belongsTo('user', {async: true}),
    replies: DS.hasMany('comment', {async: true, inverse: 'target'}),
    target: DS.belongsTo('comment', {async: true})
});
