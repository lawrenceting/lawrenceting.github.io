//------------------------------------------------------------------------------
function checkWatched(videoId, errorCallback, callback) {
    
    var request = gapi.client.youtube.playlistItems.list({
        playlistId: myChannel.contentDetails.relatedPlaylists.watchHistory,
        part: 'snippet',
        videoId: videoId
    }); // end request

    request.execute(function(response) {
        if ('error' in response) {
            return console.log(response.error.message) || false;
			
        } else if ('items' in response) {
			
			if (typeof callback === "function") { 
				callback(response); //return result
				
			} else if (typeof errorCallback === "function") { errorCallback("The success callback function passed in wasn't a function."); } // end if
        } //end if
    }); // end request.execute
} // end function
//------------------------------------------------------------------------------
function removeWatchedVideos(Ids, errorCallback, callback) {
	
    if (Ids.length) {
			
		$("#thumbnailContainer_" + Ids[0] + " .lb-watched").html( 
			'<span class="glyphicon glyphicon-ok"></span>' 
		);
		
        if ($('input#hideWatchedVideos').is(":checked") && 
            document.getElementById("thumbnailContainer_" + Ids[0])) {
            $("#thumbnailContainer_" + Ids[0]).fadeOut( "slow", function() {
				//do stuff
			});
        } //end if
        $('input#hideWatchedVideos').change(function() {
            $("#thumbnailContainer_" + Ids[0]).fadeToggle( "slow", function() {
				//do stuff
			});
        });
		
		if (typeof callback === "function") { 
			callback(Ids.length); 
			
		} else if (typeof errorCallback === "function") { errorCallback("The success callback function passed in wasn't a function."); }
    } //end if
} // end function