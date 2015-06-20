import Ember from 'ember';
import config from '../config/environment';

export default Ember.Route.extend({
	idleTimeout: null,
	model: function(){
		return this.store.find('product');
	},
	activate: function(){
		if(!Ember.isPresent(this.controllerFor('application').get('user'))){
			return this.transitionTo('/');
		}
		var _this = this;
		clearTimeout(this.get('idleTimeout'));
		var timeout = setTimeout(function(){
			_this.controllerFor('application').set('user', void 0)
			window.location.reload();
		}, config.lockTimeout);

		this.set('idleTimeout', timeout);
	},
	exit: function(){
		if(this.store.all('order-item').get('content').filterBy('sent', false).length > 0){
			this.transitionTo('error-orders');
		}
		else{
			window.location.reload();
		}
	},
	actions: {
		refresh: function(){
			var _this = this;
			clearTimeout(this.get('idleTimeout'));
			var timeout = setTimeout(function(){
				_this.exit();
			}, config.lockTimeout);
			
			this.set('idleTimeout', timeout);
		}
	}
});
