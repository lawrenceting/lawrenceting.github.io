//------------------------------------------------------------------------------
function createLiveEvents(CH_id, PL_id, errorCallback, callback) {
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        type: 'video',
        channelId: CH_id,
        fields: 'items(id,snippet),pageInfo',
        eventType: 'live'
    }); //UC1yBKRuGpC1tSM73A0ZjYjQ //UC52X5wxOL_s5yw0dQk7NtgA //UCSrZ3UV4jOidv8ppoVuvW9Q
    
    // Send the request to the API server,  
    request.execute(function(response) {
        // Termination condition to prevent infinite recursion
        if ('error' in response) { return console.log(response.error.message) || false;
			
        } else if (response.pageInfo.totalResults && response.hasOwnProperty('items')) {

			var newObj = response.items.map(function (obj) {
				obj.snippet.resourceId = obj['id'];
				delete obj['id'];
				return obj;
			});
			DB[PL_id].items = newObj.concat(DB[PL_id].items);
        } //end if
		
		if (typeof callback === "function") {
			callback(); //return result

		} else if (typeof errorCallback === "function") { errorCallback("The success callback function passed in wasn't a function."); }
    }); // end request.execute
} // end function