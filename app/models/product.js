import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	description: DS.attr('string'),
	price: DS.attr('string'),
	order: DS.attr('number'),
	available: DS.attr('boolean'),

	categoryId: DS.belongsTo('category', {
		async:true
	}),

	actions: {
		selectProduct: function(product){
			this.sendAction('selectProduct', product);
		}
	}
});
