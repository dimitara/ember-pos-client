import DS from 'ember-data';

export default DS.Model.extend({
	total: DS.attr('number'),
	discount: DS.attr('number'),
	started: DS.attr('date'),
	closed: DS.attr('date'),
	status: DS.attr('boolean'),
	fis: DS.attr('boolean'),
	reported: DS.attr('boolean'),

	openedBy: DS.belongsTo('employee'),
	operatedBy: DS.belongsTo('employee', {
		async:true
	}),

	table: DS.belongsTo('table', {
		async:true
	}),
	items: DS.hasMany('order-item', {
		async:true
	})
});
