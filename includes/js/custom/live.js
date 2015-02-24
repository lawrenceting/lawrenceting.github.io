//------------------------------------------------------------------------------
function createLiveEvents(channelId) {
  checkLiveEvents(channelId, 
    function(errorMessage) { console.log(errorMessage); }, 
    function(response, request) {

        var addIds = $.map(response.items, function(item) {
            return item.id.videoId;});
        var addTitle = $.map(response.items, function(item) {
            return item.snippet.title;});
        var addThumbnails = $.map(response.items, function(item) {
            return item.snippet.thumbnails.default.url;});
        var addDescription = $.map(response.items, function(item) {
            return item.snippet.description;});

        createLiveThumbnails(addIds, addTitle, addThumbnails, channelId);
  });
} // end function
//------------------------------------------------------------------------------
function checkLiveEvents(channelId, errorCallback, callback) {
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        type: 'video',
        channelId: channelId,
        fields: 'items(id,snippet),pageInfo',
        eventType: 'live'
    }); 
    //UC1yBKRuGpC1tSM73A0ZjYjQ //UC52X5wxOL_s5yw0dQk7NtgA //UCSrZ3UV4jOidv8ppoVuvW9Q

    // Send the request to the API server,  
    request.execute(function(response) {
        // Termination condition to prevent infinite recursion
        if ('error' in response) {
            console.log(response.error.message);
            return 0;
        } else {
            if ((response.pageInfo.totalResults > 0) && 
                (response.hasOwnProperty('items') == true)) {
                //return result
                if (typeof callback === "function") {
                    callback(response, request);
                } else if (typeof errorCallback === "function") {
                    errorCallback("The success callback function passed in wasn't a function.");
                }
            } 
        }
    }); // end request.execute
} // end function
//------------------------------------------------------------------------------
function createLiveThumbnails(videoIds, videoTitles, videoThumbnails, currentChannelID) {
	
    for (var i = 0; i < videoIds.length; i++) {
        if (!(document.getElementById("liveThumbnail_" + videoIds[i]))) {

			createThumbnails(i, "live", videoIds, videoTitles, videoThumbnails, currentChannelID, "");
        } // end if
    } // end for
} // end function