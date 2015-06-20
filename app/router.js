import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('login', {path: '/'});
  this.route('pos');
  this.route('error-orders');
  this.route('kitchen');
  this.route('skara');
});

export default Router;
