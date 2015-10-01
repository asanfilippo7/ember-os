import DS from 'ember-data';

export default DS.RESTAdapter.extend({
    host: 'https://api.osf.io',
    namespace: 'v2'
});
