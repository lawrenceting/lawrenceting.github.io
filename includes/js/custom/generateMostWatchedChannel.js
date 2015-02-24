//------------------------------------------------------------------------------
function generateMostWatchedChannel(){
	ifChannel_isFound_inWH("", [],
	    function(errorMessage) { console.log(errorMessage); }, 
	    function(channelList, recursionComplete) { //requires watchHistoryID
	    
	    var freq = countFreq(channelList); //array [x1, x2][y1, y2]
	        channelList = _.object(freq[0], freq[1]); //object {x1:y1, x2:y2}
	        channelList = _.invert(channelList); //object {y1:x1, y2:x2} sorted
	        channelList = _.pairs(channelList); //array [[x1][y1], [x2][y2]]
	    
	    	orderChannel(channelList);

		if (recursionComplete == true) {
			watchHistoryList = channelList;
			orderChannel(watchHistoryList);
			//showResponse(watchHistoryList);
			showResponse("Finish load WH.");
		} //end if
	}); //end ifChannel_isFound_inWH

	function orderChannel(channelList){
		var content = document.getElementById('content');

	    for ( var i = 0; i < channelList.length; i++ ) {

	        var channel = document.getElementById("channelContainer_" + channelList[i][1]);

	        if (channel) {
	            content.insertBefore(channel, content.firstChild); //append channel to beginning of div  with id name "content"

	        } else {
	            //showResponse("n:" + channelList[i][1]);
	            
	        } //end if
	    } //end for		
	} //end function
} //end function
//------------------------------------------------------------------------------
function ifChannel_isFound_inWH(nextPageToken, WH_List, errorCallback, callback){
	
    var request = gapi.client.youtube.playlistItems.list({
        playlistId: watchHistoryID,
        part: 'snippet',
        pageToken: nextPageToken,
        maxResults: 50,
		fields: 'items/snippet, nextPageToken, pageInfo'
    }); //end request	

	request.execute(function(response) {
		
        var totalSubs = response.pageInfo.totalResults;
        var resultsPerPage = response.pageInfo.resultsPerPage;
		
        if ((totalSubs === 0)) {
            console.log('There are no videos in playlist.');
            return 0;
			
        } else if ('error' in response) {
			console.log(response.error.message);
			return 0;
			
		} else if (('items' in response) && (response.items[0].hasOwnProperty('snippet') == true)) {
			
			var videoIds = $.map(response.items, function(item) {return item.snippet.resourceId.videoId;})
							.join(); //comma-separated list of the YouTube video ID(s)
			
			getChannels_inWH(videoIds, 
				function(errorMessage) { console.log(errorMessage); }, 
				function(channelList, loopComplete) {
				
				if ((resultsPerPage >= totalSubs) || !('nextPageToken' in response)) {

					if (typeof callback === "function") {
						WH_List = $.merge(WH_List, channelList);
						callback(WH_List, true);

					} else if (typeof errorCallback === "function") {
						errorCallback("The success callback function passed in wasn't a function.");
					}
					console.log("Exit recursion.");
					return 0;

				} else {
					callback(channelList, false);
					nextPageToken = response.nextPageToken;
					return ifChannel_isFound_inWH(nextPageToken, WH_List, errorCallback, callback);
				}  //end if					
			}); //end getChannels_inWH
		} //end if
	}); // end request.execute	
} //end function
//------------------------------------------------------------------------------
function getChannels_inWH(videoIds, errorCallback, callback) {
	$.when( // AJAX requests
		$.ajax({
			url: "https://www.googleapis.com/youtube/v3/videos?" + 
					"part=snippet&" + 
					"id=" + videoIds + "&" + 
					"fields=items(snippet)&" + 
					"key=" + apiKey
		})
	).then(function(response, textStatus, jqXHR) {

		if ('error' in response) {
			console.log(response.error.message);

		} else if (('items' in response) && (response.items[0] || 0)) {
			
			if (typeof callback === "function") { //return result
				var channelList = $.map(response.items, function(item) {return item.snippet.channelId;});
				callback(channelList, true);
				
			} else if (typeof errorCallback === "function") {
				errorCallback("The success callback function passed in wasn't a function.");
				
			} // end if
		} //end if	
	}); //end ajax call
} //end function
