import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
    find: function(store, type, id) {
        var typeKey = type.typeKey.replace('-', '');
        
        return this.ajax(this.buildURL(typeKey, id), 'GET');
    },

    findAll: function(store, type, sinceToken) {
        // Do your thing here
        var typeKey = type.typeKey.replace('-', '');
        var query;

        return this.ajax(this.buildURL(typeKey.toLowerCase()), 'GET', {
            data: query
        });
    },

    createRecord: function(store, type, snapshot) {
        var data = {};
        var serializer = store.serializerFor(type.modelName);
        var url = this.buildURL(type.modelName.replace('-', '').toLowerCase(), null, snapshot, 'createRecord');

        serializer.serializeIntoHash(data, type, snapshot, {
            includeId: true
        });

        data.addedBy = data.added_by;

        return this.ajax(url, "POST", {
            data: data
        });
    },
    updateRecord: function(store, type, snapshot){
    	var data = {};
	    var serializer = store.serializerFor(type.modelName);

	    serializer.serializeIntoHash(data, type, snapshot);

	    var id = snapshot.id;
	    var url = this.buildURL(type.modelName.replace('-', '').toLowerCase(), id, snapshot, 'updateRecord');

        data.addedBy = data.added_by;

	    return this.ajax(url, "PUT", { data: data });
    }
});