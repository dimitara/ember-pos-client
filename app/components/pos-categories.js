import Ember from 'ember';

export default Ember.Component.extend({
	store: Ember.inject.service(),
	categories: function(){
		return this.get('store').find('category');
	}.property(),
	actions: {
		selectCategory: function(category){
			this.sendAction('selectCategory', category);

            this.get('categories').setEach('selected', false);
            category.set('selected', true);
		}
	}
});
