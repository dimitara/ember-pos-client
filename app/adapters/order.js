import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
	createRecord: function(store, type, snapshot) {
        var data = {};
        var serializer = store.serializerFor(type.modelName);
        var url = this.buildURL(type.modelName, null, snapshot, 'createRecord');

        serializer.serializeIntoHash(data, type, snapshot, {
            includeId: true
        });

        data.openedBy = data.opened_by;
        data.operatedBy = data.operated_by;

        return this.ajax(url, "POST", {
            data: data
        });
    },
    updateRecord: function(store, type, snapshot){
    	var data = {};
	    var serializer = store.serializerFor(type.modelName);

	    serializer.serializeIntoHash(data, type, snapshot);

	    var id = snapshot.id;
	    var url = this.buildURL(type.modelName, id, snapshot, 'updateRecord');

	    data.openedBy = data.opened_by;
        data.operatedBy = data.operated_by;

	    return this.ajax(url, "PUT", { data: data });
    }
});
