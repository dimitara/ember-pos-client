import DS from 'ember-data';

export default DS.Model.extend({
	nickname: DS.attr('string'),
	number: DS.attr('number'),
	taken: DS.attr('boolean'),
	booked: DS.attr('boolean')
});
