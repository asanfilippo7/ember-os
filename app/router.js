import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('nodes', {path: '/nodes'}, function() {
    this.route('node', {path: '/node/:node_id'});
    this.route('tagged', {path: '/tagged'});
    this.route('tag', {path: '/tag/:tag_id'});
  });
});

export default Router;
