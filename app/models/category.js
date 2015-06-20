import DS from 'ember-data';

export default DS.Model.extend({
	name: DS.attr('string'),
	neatName: DS.attr('string'),
	order: DS.attr('number')
});
