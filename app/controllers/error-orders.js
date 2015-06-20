import Ember from 'ember';

export default Ember.Controller.extend({
    items: null,

    reloadItems: function(){
        this.set('items', this.store.all('order-item').get('content').filterBy('sent', false));
    }.on('init'),

    actions: {
        sendOrderItems: function(){
            var _this = this;
            this.get('items').forEach(function(item){
                item.save().then(function(){
                    if(_this.get('items').filterBy('sent', false).length === 0){
                        _this.send('lock');
                    }
                });
            });
        },
        lock: function(){
            this.transitionTo('/');
            window.location.reload();
        }
    }
});
