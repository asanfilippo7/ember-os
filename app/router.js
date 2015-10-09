import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('nodes', {path: '/'}, function() {
    this.route('node', {path: '/node/:node_id'});
    this.route('astrology', {path: '/astrology'});
  });
});

export default Router;
