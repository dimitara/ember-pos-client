import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['application'],
	user: Ember.computed.alias("controllers.application.user"),
	error: false,
	pin: '',
	actions: {
		login: function(params){
			var loggedUser = this.store.all('employee').get('content').filterBy('pin', this.get('pin'));
			
			if(loggedUser.length === 1){
				loggedUser = loggedUser[0];
				this.set('controllers.application.user', loggedUser);
				this.set('error', false);

				this.transitionTo('pos');
			}
			else{
				this.set('error', true);
			}
		}
	}
});
