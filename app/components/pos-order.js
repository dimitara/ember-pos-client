import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['order'],
	hasUnsentItems: false,
	total: function(){
		if(!this.get('order')) return ;

		var total = 0;
		
		this.set('hasUnsentItems', false);

		var _this = this;
		this.get('order.items').forEach(function(orderItem){
			total += orderItem.get('product.price') * orderItem.get('quantity');
			
			if(!orderItem.get('sent')){
				_this.set('hasUnsentItems', true);
			}
		});

		return parseFloat(Math.round(total * 100) / 100).toFixed(2);;
	}.property('order', 'order.items.@each', 'order.items.@each.quantity'),

	items: function(){
		if(!this.get('order.items')) return [];

		return this.get('order.items').filter(function(item){
			return !(item.get('sent') && item.get('quantity') === 0);
		}).sortBy('enteredUTC').reverse();
	}.property('order', 'order.items.@each'),

	actions: {
		send: function(){
			this.sendAction('sendOrder');
		},
		closeConfirm: function(){
			if(this.get('hasUnsentItems')) return ;

			this.set('finishOrderVisible', true);

			this.sendAction('refresh');
		},
		reduce: function(item){
			if(item.get('sent')) return ;
			
			if(item.get('quantity') <= 1){
				item.set('quantity', 0)
			}
			else{
				item.set('quantity', item.get('quantity') - 1);
			}

			this.sendAction('refresh');
		},
		showComment: function(item){
			if(item.get('sent')) return ;

			this.set('selectedItem', item);
			this.set('comment', item.get('comment'));
			this.set('commentsVisible', true);
			
			this.sendAction('refresh');
		},
		sendComment: function(){
			this.get('selectedItem').set('comment', this.get('comment'));
			this.set('commentsVisible', false);
			this.set('comment', '');

			this.sendAction('refresh');
		},
		closeComment: function(){
			this.set('commentsVisible', false);
			this.set('comment', '');

			this.sendAction('refresh');
		},

		closeFinishOrder: function(){
			this.set('finishOrderVisible', false);

			this.sendAction('refresh');
		},

		close: function(){
			if(this.get('items').filterBy('sent', false).length > 0) return ;
			
			this.sendAction('closeOrder');
			this.set('finishOrderVisible', false);
		}
	}
});
