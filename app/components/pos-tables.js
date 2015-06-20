import Ember from 'ember';

export default Ember.Component.extend({
	store: Ember.inject.service(),
	tables: null,
	didInsertElement: function() {
        var tables = this.get('store').all('table').get('content');
		var orders = this.get('store').all('order').get('content');

		var _this = this;
		tables.forEach(function(table){
			var filteredOrders = orders.filterBy('table.id', table.get('id'));
			if(filteredOrders.length > 0){
				table.set('taken', true);
				
				if(_this.get('user.id') === filteredOrders[0].get('operatedBy.id')){
					table.set('mine', true);
				}
				else{
					table.set('mine', false);
				}
			}
			else{
				table.set('mine', true);
			}
		});

		this.set('tables', tables.sortBy('number'));
    },
	orderChanged: function(){
		
	}.property('tables.@each.taken'),
	actions: {
		selectTable: function(table){
			if(table.get('mine')) {
				this.sendAction('selectTable', table);
			}
		}
	}
});
