import Ember from 'ember';

export default Ember.Controller.extend({
	orders: null,
	employees: null,
	user: null,
	onInit: function(){
		var _this = this;
		this.store.find('order').then(function(orders){
			_this.set('orders', orders);
		});

		this.store.find('employee').then(function(employees){
			_this.set('employees', employees);
		});

		this.store.find('order-item');

		this.store.find('table');
	}.on('init'),
	actions: {

	}
});
