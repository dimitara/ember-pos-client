import DS from 'ember-data';

export default DS.Model.extend({
	quantity: DS.attr('number'),
	entered: DS.attr('date'),
	sent: DS.attr('boolean'),
	comment: DS.attr('string'),
	cooked: DS.attr('boolean'),
	reduced: DS.attr('number'),
	price: DS.attr('number'),
    categoryType: DS.attr('string'),
    addedBy: DS.belongsTo('employee', {
        async:true
    }),
	product: DS.belongsTo('product', {
        async:true
    }),
	order: DS.belongsTo('order', {
        async:true
    }),
    enteredUTC: function(){
        if(this.get('sent')){
            var normalizedDate = this.get('entered');
            normalizedDate.setHours(normalizedDate.getHours() - 3);

            return normalizedDate;
        }

        return this.get('entered');
    }
});
