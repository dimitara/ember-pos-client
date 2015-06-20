import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['application'],
	tablesVisible: false,
	ordersVisible: false,
	reportsVisible: false,
	keyword: null,
	user: Ember.computed.alias('controllers.application.user'),
	availableOrders: Ember.computed.alias("controllers.application.orders"),
	onInit: function(){
		this.set('tablesVisible', true);
	}.on('init'),
	actions: {
		toggleTables: function(){
			this.set('reportsVisible', false);

			if(!Ember.isPresent(this.get('currentOrder'))){
				this.set('tablesVisible', true);	
			}
			else{
				this.set('tablesVisible', !this.get('tablesVisible'));				
			}
			
			this.send('refresh');
		},
		toggleReports: function(){
			this.set('tablesVisible', false);
			this.set('reportsVisible', !this.get('reportsVisible'));
			this.send('refresh');
		},
		lock: function(){
			window.location.reload();
		},
		selectTable: function(table){
			this.set('selectedTable', table);

			var order = this.get('availableOrders.content').filterBy('table.id', table.get('id'));

			if(order.length === 1){
				this.set('currentOrder', order[0]);
			}
			else{
				var order = this.store.createRecord('order', {
					'table': table,
					'discount': 0,
					'started': new Date(),
					'status': false,
					'reported': false,
					'total': 0,
					'openedBy': this.get('controllers.application.user'),
					'operatedBy': this.get('controllers.application.user')
				});

				var _this = this;
				order.save().then(function(newOrder){
					newOrder.get('table').set('taken', true);
					_this.set('currentOrder', newOrder);
				});
			}

			this.set('tablesVisible', false);
			this.set('selectedProduct', null);

			this.send('refresh');
		},
		selectCategory: function(category){
			this.set('selectedCategory', category);

			this.send('refresh');
		},
		selectProduct: function(product){
			if(this.get('lastItem.product.id') === product.get('id')){
				this.get('lastItem').set('quantity', this.get('lastItem').get('quantity') + 1);
			}
			else{
				var orderItem = this.store.createRecord('order-item', {
					'product': product,
					'quantity': 1,
					'entered': new Date(),
					'price': product.get('price'),
					'order': this.get('currentOrder'),
					'addedBy': this.get('controllers.application.user'),
					'sent': false,
					'reduced': 0
				});				

				this.set('lastItem', orderItem);
			}

			this.send('refresh');
		},
		sendOrder: function(){
			var unsentOrderItems = this.get('currentOrder.items').filterBy('sent', false);

			unsentOrderItems.forEach(function(orderItem){
				orderItem.save();
			});

			this.send('refresh');
		},
		closeOrder: function(){
			var order = this.get('currentOrder');
			order.set('status', true);
			
			var _this = this;
			order.save().then(function(closedOrder){
				closedOrder.get('table').set('taken', false);
				_this.store.unloadRecord(closedOrder);
			});

			this.set('tablesVisible', true);

			this.send('refresh');
		},
		filterProducts: function(keyword){
			this.set('keyword', keyword);

			this.send('refresh');
		},
		confirm: function(keyword){
			this.set('keyword', keyword);

			this.send('refresh');
		}
	}
});
