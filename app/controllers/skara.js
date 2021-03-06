import Ember from 'ember';

export default Ember.Controller.extend({
    orderItems: function(){
        var orderItems = this.get('model').filter(function(oi){return !oi.get('cooked') && (oi.get('categoryType') === 'ska');}).sortBy('entered').reverse();
        var now = new Date();
        orderItems.forEach(function(item){
            var orderDate = item.get('entered');
            orderDate.setHours(orderDate.getHours() - 3);
            item.set('minutes', Math.ceil(Math.abs(now - orderDate)/60000));
        });
        return orderItems;
    }.property('model', 'model.length', 'model.@each.cooked'),
    actions: {
        itemCooked: function(item){
            item.set('cooked', true);
            item.save();
        }
    }
});
