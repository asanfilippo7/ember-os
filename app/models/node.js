import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  description: DS.attr('string'),
  category: DS.attr(),
  dateCreated: DS.attr('date'),
  dateModified: DS.attr('date'),
  registration: DS.attr('boolean'),
  collection: DS.attr('boolean'),
  dashboard: DS.attr('boolean'),
  tags: DS.attr('string'),
    public: DS.attr('boolean'),
    links: DS.attr(),
    children: DS.attr(),
    contributors: DS.attr(),
    files: DS.attr(),
    nodeLinks: DS.attr(),
    parent: DS.attr(),
    registrations: DS.attr()
});
