import Ember from 'ember';

export default Ember.Component.extend({
    classNames: ['search'],
    keyword: null,
    keywordChange: function(){
        this.send('search');
    }.observes('keyword'),
    actions:{
        search: function(){
            this.sendAction('filterProducts', this.get('keyword'));

            //this.set('keyword', null);
        },
        confirm: function(){
            this.sendAction('confirm', this.get('keyword'));
        }
    }
});
