import Ember from 'ember';
import config from '../config/environment';

export default Ember.Service.extend({
    ajax: function(url){
        //TODO: isolate ajax call as a base ajax service
        return Ember.$.ajax({
            url: url,
            type: "GET"
        });
    },

    printDailyReport: function(data) {
        var url = config.APP.API_HOST + '/generate_current_report?w=' + data.user.get('id');

        return this.ajax(url);
    },

    getReportsForUser: function(data){
        var url = config.APP.API_HOST + '/waiter_reports?w=' + data.user.get('id');
        
        return this.ajax(url);
    }
});
