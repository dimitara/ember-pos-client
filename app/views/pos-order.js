import Ember from 'ember';

export default Ember.View.extend({
    keyDown: function(event) {
        console.log('www');
        // 'ESC' key
        if (event.keyCode === 27) {
            this.get('controller').send('cancelEdit');
        }
    }
});
