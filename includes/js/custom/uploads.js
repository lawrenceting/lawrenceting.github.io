//------------------------------------------------------------------------------
function uploads(channelId) {
    // Now that we know the channelIds of the subscriptions,
    // we can retrieve the upload playlist for each subscriptions.
//------------------------------------------------------------------------------
    // get upload playlist
    getRelatedPlaylistID(false, channelId, 
        function(errorMessage) { console.log(errorMessage); }, 
        function(result) {
		
		var uploadsListId = result["uploads"];
//------------------------------------------------------------------------------
        // get videos from upload playlist //recurse starting from here //need separate function, 
        getUploadVideosID('', uploadsListId, channelId, 
            function(errorMessage) { console.log(errorMessage); }, 
            function(response) {
            // jQuery.map() iterates through all of the items in the response and
            // creates a new array that only contains the specific property we're
            // looking for: videoId.
            var videoIds = $.map(response.items, function(item) {
                return item.snippet.resourceId.videoId;});
            var videoThumbnails = $.map(response.items, function(item) {
				if (item.snippet.hasOwnProperty('thumbnails') == true) {
					return item.snippet.thumbnails.default.url;
				} else {
					console.log(item.snippet.title + item.snippet.description);
					return item.snippet.title + " - " + item.snippet.description;
				}
			});
			var videoTitles = $.map(response.items, function(item) {
                return item.snippet.title;});
			var videoDescriptions = $.map(response.items, function(item) {
                return item.snippet.description;});			
//------------------------------------------------------------------------------
            // Now that we know the IDs of all the videos in the uploads list,
            // we can create video thumbnails of uploads
            createVideoThumbnails(videoIds, videoTitles, videoThumbnails, channelId, uploadsListId,
                function(errorMessage) { console.log(errorMessage); }, 
                function(i) {
//------------------------------------------------------------------------------
                // Remove watched videos
                // Check if video Id extist in Watch History playlist
                checkWatched(videoIds[i], 
                    function(errorMessage) { console.log(errorMessage); }, 
                    function(response) {
//------------------------------------------------------------------------------
                    removeWatchedVideos(response);
                    
                }); // end getPlaylistVideosID
            }); // end createVideoThumbnails
        }); // end getPlaylistVideosID
    }); // end getRelatedPlaylistID
} //end function
//------------------------------------------------------------------------------
// Calls the Data API to retrieve the items in a particular playlist. In this
// example, we are retrieving a playlist of the user's
// uploaded videos. By default, the list returns the most recent videos first.
function getUploadVideosID(nextPageToken, playlistId, currentChannelID, errorCallback, callback) {
	
    var thumbnailWidth = parseInt($(".thumbnailContainer").css("width"), 10); //Get thumbnail width
	
    if (!(thumbnailWidth || 0)) { //if thumbnailWidth is undefined
        var newDiv = document.createElement("div");
            newDiv.className = "thumbnailContainer";
            document.body.appendChild(newDiv);
            thumbnailWidth = parseInt($(".thumbnailContainer").css("width"), 10);
            newDiv.remove();
    } //end if
	
    var maxResults = Math.ceil(screen.width/thumbnailWidth); // screen width / thumbnail width
    if (maxResults > 50) {maxResults = 50; console.log("maxResults > 50");} 
    
    var request = gapi.client.youtube.playlistItems.list({
        playlistId: playlistId,
        part: 'snippet',
        pageToken: nextPageToken,
        maxResults: maxResults
    }); //end request
//------------------------------------------------------------------------------    
    request.execute(function(response) {
        var totalResults = response.pageInfo.totalResults;
        
        if ('error' in response) {
            console.log(response.error.message);
            return 0;
        } else {
            if ('items' in response) {
                //return result
                if (typeof callback === "function") {
                    callback(response);
                } else if (typeof errorCallback === "function") {
                    errorCallback("The success callback function passed in wasn't a function.");
                } // end if
//------------------------------------------------------------------------------
				if (totalResults == 0) {
					document.getElementById("channelContainer_" + currentChannelID).remove();
					console.log("Channel " + currentChannelID + " has 0 videos.");
					return 0;
					
				} else  if (!('nextPageToken' in response)) {
                    console.log("Exit recursion.");
                    return 0;
					
                } else {
                    nextPageToken = response.nextPageToken;
//------------------------------------------------------------------------------
// If scrolled to the end
//------------------------------------------------------------------------------
                    $('#thumbnailsScrollArea_' + currentChannelID).bind('scroll', function(){
                        if($(this).scrollLeft() + $(this).innerWidth() >= $(this)[0].scrollWidth){
							// problem with duplicates being produced - unresolved
                            return getUploadVideosID(
								nextPageToken, playlistId, currentChannelID, errorCallback, callback);
                        }
                    });
//------------------------------------------------------------------------------
// If window is resized
//------------------------------------------------------------------------------
                    $(window).resize(function() {
                        addThumbnails();
                    });
//------------------------------------------------------------------------------
// If watched videos are hidden
//------------------------------------------------------------------------------
                    // select the target node
                    var target = document.querySelector('#thumbnailsContainer_' + currentChannelID);

                    // create an observer instance
                    var observer = new MutationObserver(function(mutations, observer) {
                        // fired when a mutation occurs
                        mutations.forEach(function(mutation) {
                            var id = mutation.target.id;
                            if ($( "#" + id ).parent().attr('id') == 'thumbnailsContainer_' + currentChannelID) {
                                addThumbnails();
                            }
                        });    
                    });
                    // configuration of the observer:
                    var config = {subtree: true, attributes: true, childList: true, characterData: true};

                    // define what element should be observed by the observer
                    // and what types of mutations trigger the callback
                    // pass in the target node, as well as the observer options
                    observer.observe(target, config);
//------------------------------------------------------------------------------
                } // end if
            }  // end if
        } // end if
    }); // end request.execute
//------------------------------------------------------------------------------
    function addThumbnails() {
        var count = $('#' + 'thumbnailsContainer_' + currentChannelID + ' > :visible').length;
        if (count < maxResults) { 
            return getUploadVideosID(nextPageToken, playlistId, currentChannelID, errorCallback, callback); 
        }
    } // end function addThumbnails()	
//------------------------------------------------------------------------------		
} // end function
//------------------------------------------------------------------------------
function createVideoThumbnails(videoIds, videoTitles, videoThumbnails, currentChannelID, uploadsListId, errorCallback, callback) {
    
    for (var i = 0; i < videoIds.length; i++) {
        if (!(document.getElementById("thumbnailContainer_" + videoIds[i]))) {
        
			createThumbnails(i, "uploads", videoIds, videoTitles, videoThumbnails, currentChannelID, uploadsListId);
			
            if (typeof callback === "function") {
                callback(i); 
            } else if (typeof errorCallback === "function") {
                errorCallback("The success callback function passed in wasn't a function.");
            } // end if
        } // end if
    } //end for
} // end function
//------------------------------------------------------------------------------
function checkWatched(videoId, errorCallback, callback) {
    
    var request = gapi.client.youtube.playlistItems.list({
        playlistId: watchHistoryID,
        part: 'snippet',
        maxResults: 50,
        videoId: videoId
    }); // end request

    request.execute(function(response) {
        if ('error' in response) {
            console.log(response.error.message);
        } else {
            if ('items' in response) {
				
                //return result
                if (typeof callback === "function") {
                    callback(response);
                } else if (typeof errorCallback === "function") {
                    errorCallback("The success callback function passed in wasn't a function.");
                } // end if
            }
        } //end if
    }); // end request.execute
} // end function
//------------------------------------------------------------------------------
function removeWatchedVideos(response) {
    // jQuery.map() iterates through all of the items in the response and
    // creates a new array that only contains the specific property we're
    // looking for: videoId.
    var Ids = $.map(response.items, function(item) {return item.snippet.resourceId.videoId;});
    var totalResults = response.pageInfo.totalResults;

    if (totalResults === 1) {
		
		var lb = document.createElement("span");
			lb.className = "label label-primary lb-watched";
			lb.innerHTML += "Watched";

		var thumbnail = document.getElementById("videoThumbnail-default_" + Ids[0]);
			thumbnail.appendChild(lb);		
		
        if ($('input#hideWatchedVideos').is(":checked") && 
            document.getElementById("thumbnailContainer_" + Ids[0])) {
            $("#thumbnailContainer_" + Ids[0]).fadeOut( "slow", function() {
			// Animation complete.
			});
        } //end if
        $('input#hideWatchedVideos').change(function() {
            $("#thumbnailContainer_" + Ids[0]).fadeToggle( "slow", function() {

			});
        });
    } //end if
} // end function