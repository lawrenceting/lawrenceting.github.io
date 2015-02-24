//------------------------------------------------------------------------------
function generateMostWatchedChannel(errorCallback, callback){
	// overwrite this function, so it will be executed only once
	generateMostWatchedChannel = Function("");
	
	ifChannel_isFound_inWH("", 
	    function(errorMessage) { console.log(errorMessage); }, 
	    function(channelList, recursionComplete) { //
		
		var channelList = _.union(channelList);
			channelList = _.difference(channelList, WH_List);
			orderChannel(channelList);	
		
			WH_List = $.merge(WH_List, channelList);
			WH_List = _.union(WH_List);
		
		if (recursionComplete) { 
			
            if (typeof callback === "function") { 
				callback(); //return result

            } else if (typeof errorCallback === "function") { errorCallback("The success callback function passed in wasn't a function."); }
            
			console.log("Completed generating most watched channels."); 
		}
	}); //end ifChannel_isFound_inWH
} //end function
//------------------------------------------------------------------------------
function orderChannel(channelList){
	var content = document.getElementById('content');

	for ( var i = 0; i < channelList.length; i++ ) {

		var channel = document.getElementById("channelContainer_" + channelList[i]);

		if (channel) {
			content.insertBefore(channel, content.firstChild); //append channel to beginning of div  with id name "content"
			
//			$( "#channelContainer_" + PL_id ).addClass( "bounceIn" );

		} else {
			ifChannel_isSubed(channelList[i],
				function(errorMessage) { console.log(errorMessage); }, 
				function(subs) { 

				var PL_arr = $.map(subs.items, function(item) { return item.snippet.resourceId.channelId.replaceAt(1, "U"); });
				
				playlists(PL_arr.join(), 
					function(errorMessage) { console.log(errorMessage); }, 
					function(response) {

					generateThumbsDetails(PL_arr, response, 
						function(errorMessage) { console.log(errorMessage); }, 
						function(PL_id) {

						channel = document.getElementById("channelContainer_" + PL_id);
						content.insertBefore(channel, content.firstChild); //append channel to beginning of div  with id name "content"
						
//						$( "#channelContainer_" + PL_id ).addClass( "bounceIn" );
						
					});	//end generateThumbsDetails
				});	//end playlists						
			}); //end ifChannel_isSubed
		} //end if
	} //end for		
} //end function
//------------------------------------------------------------------------------
function ifChannel_isSubed(CH_id, errorCallback, callback) {
    
    var request = gapi.client.youtube.subscriptions.list({
        mine: true,
        part: 'snippet',
		forChannelId: CH_id,
        maxResults: 50,
        order: 'unread',
        fields: 'items/snippet, pageInfo'
    }); //end request
        // order: 'unread' or 'alphabetical' or 'relevance'
//------------------------------------------------------------------------------
    request.execute(function(response) {

		if ('error' in response) { return console.log(response.error.message) || false;
			
        } else if ('items' in response) {
			
            if (typeof callback === "function") { 
				callback(response);
            } else if (typeof errorCallback === "function") { errorCallback("The success callback function passed in wasn't a function."); }
        } //end if
    }); //end request.execute
} //end function
//------------------------------------------------------------------------------
function ifChannel_isFound_inWH(nextPageToken, errorCallback, callback){
	
    var request = gapi.client.youtube.playlistItems.list({
        playlistId: myChannel.contentDetails.relatedPlaylists.watchHistory,
        part: 'snippet',
        pageToken: nextPageToken,
        maxResults: 50,
		fields: 'items/snippet, nextPageToken, pageInfo'
    }); //end request	

	request.execute(function(response) {
		
		nextPageToken = response.nextPageToken;
		
		if ('error' in response) { return console.log(response.error.message) || false;
			
		} else if ('items' in response) { //&& (response.items[0].hasOwnProperty('snippet')
			
			var videoIds = $.map(response.items, function(item) {return item.snippet.resourceId.videoId;})
							.join(); //comma-separated list of the YouTube video ID(s)
			
			getChannels_inWH(videoIds, 
				function(errorMessage) { console.log(errorMessage); }, 
				function(channelList, loopComplete) {
				
				if (!('nextPageToken' in response)) {
					
					if (typeof callback === "function") { 
						callback(channelList, true);
					} else if (typeof errorCallback === "function") { errorCallback("The success callback function passed in wasn't a function."); }
					
					return console.log("Exit recursion.") || false;
					
				} else {
					
					if (typeof callback === "function") { 
						callback(channelList, false);
					} else if (typeof errorCallback === "function") { errorCallback("The success callback function passed in wasn't a function."); }
					
					return ifChannel_isFound_inWH(nextPageToken, errorCallback, callback);
					
				}  //end if			
			}); //end getChannels_inWH
		} //end if
	}); // end request.execute	
} //end function
//------------------------------------------------------------------------------
function getChannels_inWH(videoIds, errorCallback, callback) {
	$.ajax({
		type: "GET",
		url: "https://www.googleapis.com/youtube/v3/videos",
		dataType: "json",
		data: {
			part: "snippet",
			id: videoIds,
			fields: "items(snippet)",
			key: apiKey
		},
		async: true,
		success: function( response ) {

			if ('error' in response) { return console.log(response.error.message) || false;

			} else if (('items' in response)) { // && (response.items[0] || 0)

				if (typeof callback === "function") { //return result
					var channelList = $.map(response.items, function(item) {return item.snippet.channelId;});
					callback(channelList, true);

				} else if (typeof errorCallback === "function") { errorCallback("The success callback function passed in wasn't a function."); } // end if
			} //end if	
		}			
	});
} //end function