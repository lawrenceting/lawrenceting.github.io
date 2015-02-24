//------------------------------------------------------------------------------
function getRelatedPlaylistID(mine, channelId, errorCallback, callback) {
    // https://developers.google.com/youtube/v3/docs/channels/list
    var request = gapi.client.youtube.channels.list({
        part: 'contentDetails',
        fields: 'items/contentDetails/relatedPlaylists'
    }); // end request

	var para = request.B.B.params;
	if ( mine == true ){ para.mine = mine; } 
		else { para.id = channelId; }
	
    request.execute(function(response) {
        if ('error' in response) {
            displayMessage(response.error.message);
            return 0;
        } 
        else {
            // This string, of the form "UUdLFeWKpkLhkguiMZUp8lWA", is a unique ID
            // for a playlist of videos uploaded to the user's channel.
            if (typeof callback === "function") {
				//return result
				var result = response.items[0].contentDetails.relatedPlaylists;
                callback(result);
            } else if (typeof errorCallback === "function") {
                errorCallback("The success callback function passed in wasn't a function.");
            }
        } // end if
    }); // end request.execute
} // end function