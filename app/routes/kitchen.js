import Ember from 'ember';

export default Ember.Route.extend({
    model:function(){
        return this.store.find('order-item');
    },

    activate: function(){
        var _this = this;
        setInterval(function(){
            _this.store.find('order-item').then(function(orderitems){
                _this.controllerFor('kitchen').set('model', orderitems);
            });
        }, 15000);
    }
});
