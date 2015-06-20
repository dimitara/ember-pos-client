import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
    reportsService: Ember.inject.service('reports'),
    reports: null,
    didInsertElement: function(){
        var _this = this;
        
        this.get('reportsService').getReportsForUser({
                'user': this.get('user')
            }).then(function(reports){
            var rprts = reports.reports.map(function(r){
                return {
                    'date': r ? r.replace('T', ' ') : null,
                    'link': config.APP.API_HOST + '/daily_waiter_reports?w=' + _this.get('user.id') + '&d=' + (r ? r: '')
                };
            });
            
            rprts = rprts.filter(function(report){
                return report.date !== null;
            });

            _this.set('reports', rprts);
        });
    },
    actions: {
        printDailyReport: function(){
            var _this = this;
            this.get('reportsService').printDailyReport({
                'user': this.get('user')
            }).then(function(){
                _this.get('reportsService').getReportsForUser({
                    'user': _this.get('user')
                }).then(function(reports){
                    var rprts = reports.reports.map(function(r){
                        return {
                            'date': r ? r.replace('T', ' ') : null,
                            'link': config.APP.API_HOST + '/daily_waiter_reports?w=' + _this.get('user.id') + '&d=' + (r ? r: '')
                        };
                    });
                    
                    rprts = rprts.filter(function(report){
                        return report.date !== null;
                    });

                    _this.set('reports', rprts);
                });
            }, function(data){
                console.log(data);
            });        
        }
    }
});
