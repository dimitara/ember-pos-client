import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['products'],
	store: Ember.inject.service(),
	keyword: null,
	filteredProducts: function(){
		if(!this.get('selectedCategory.id') && !this.get('keyword')) return this.get('products');
		
		var products = this.get('products');

		var _this = this;

		if(this.get('keyword')){
			products = products.filter(function(product){
				if(product.get('name').toLowerCase().indexOf(_this.get('keyword').toLowerCase()) > -1) return true;
				return false;
			});
		}

		if(this.get('selectedCategory.id')){
			products = products.filterBy('categoryId.id', this.get('selectedCategory.id'));
		}

		return products.sortBy('name');
	}.property('products', 'selectedCategory', 'keyword'),
	actions: {
		selectProduct: function(product){
			this.sendAction('selectProduct', product);
		}
	}
});
