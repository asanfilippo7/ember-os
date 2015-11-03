import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  //  this.route('user', {path: '/users'}, function() {
  //    this.route('user', {path: '/user/:user_id'});
  //  });
  this.route('nodes', {path: '/nodes'}, function() {
    this.route('node', {path: '/node/:node_id'});
    this.route('tag', {path: 'tags/:tag_id'});
    this.route('recent', {path: '/recent'});
  });
  this.route('users', {path: '/users'}, function() {
    this.route('user', {path: '/user/:user_id'});
  });
});

export default Router;
