//------------------------------------------------------------------------------
function generateThumbsDetails(PL_arr, response, errorCallback, callback) {
//------------------------------------------------------------------------------
//Create divs for channel  + thumbnails + scrollarea
//------------------------------------------------------------------------------		
    for (var i = 0; i < PL_arr.length; i++) {

        if (!document.getElementById("channelContainer_" + PL_arr[i])) {

			var PL_id = PL_arr[i]; //playlist ID
				DB[PL_id] = { pageInfo: {}, nextPageToken: "", items: [] };
				
//------------------------------------------------------------------------------			
			create_DIVS(i, PL_arr, 
				function(errorMessage) { console.log(errorMessage); }, 
				function(i) {
//------------------------------------------------------------------------------
				create_CH_Thumb_Title(PL_id, response, i, 
					function(errorMessage) { console.log(errorMessage); }, 
					function(PL_id) {
				}); //
//------------------------------------------------------------------------------
				//get videos from playlist 
				playlistItems(PL_id, false, 
					function(errorMessage) { console.log(errorMessage); }, 
					function(PL_id) {

					if ( (PL_id[0] == "U") && (PL_id[1] == "U") ) { //if playlist is uploads playlist

						createLiveEvents(PL_id.replaceAt(1, "C"), PL_id, 
							function(errorMessage) { console.log(errorMessage); }, 
							function() {

							eachPlaylistItem(PL_id, function(errorMessage) { console.log(errorMessage); }, function() {  }); //end eachPlaylistItem
						});
						
					} else { 
						
						eachPlaylistItem(PL_id, function(errorMessage) { console.log(errorMessage); }, function() {  }); //end eachPlaylistItem
					}

				}); //end playlistItems					
//------------------------------------------------------------------------------
				if (typeof callback === "function") { 
					callback(PL_id); 
					
				} else if (typeof errorCallback === "function") { errorCallback("The success callback function passed in wasn't a function."); } //end if
			}); //end createDivs
        } // end if
    } // end for	
} //end function
//------------------------------------------------------------------------------
// generate div for playlist and div inside
//------------------------------------------------------------------------------
function create_DIVS(i, PL_arr, errorCallback, callback){

	var PL_id = PL_arr[i];

	$("#content").append(
		'<div class="channelContainer" id="channelContainer_' + PL_id + '">' + //
		
			'<div class="channelThumbnailContainer">' + 
//------------------------------------------------------------------------------		
				//navigate playlist items
				'<div class="btn-group btn-group-xs nav-playlist">' + 
					'<button type="button" class="btn btn-default nav-PL-Left">' + '<span class="glyphicon glyphicon-chevron-left">' + '</span>' + '</button>' + 
					'<button type="button" class="btn btn-default nav-PL-Right">' + '<span class="glyphicon glyphicon-chevron-right">' + '</span>' + '</button>' + 
				'</div>' + 		
//------------------------------------------------------------------------------		
				// channel title + thumbnail
				'<div class="channelTitle-container media">' + 
		
					'<a class="pull-left" href="#">' + '<img class="media-object thumbnail channelThumbnail">' + '</a>' +
		
					'<div class="media-body">' + 
						'<h4 class="media-heading ch-vid-title">' + 	
							'<a class="CH_title" href="#"></a> ' + 
							'<a href="//www.youtube.com/playlist?list=' + PL_id + '" target="_blank">' + '<span class="glyphicon glyphicon-link"></span>' + '</a>' + 
						'</h4>' + 
						'<span class="badge PL-count">' + '0+' + '</span>' + 
					'</div>' + 		
		
				'</div>' + 
//------------------------------------------------------------------------------		
			'</div>' + 
			
			//playlist items
			'<div class="thumbnailsScrollArea">' + //Create div for scroll area
				'<div class="thumbnailsContainer">' + //Create div for video thumbnails
				'</div>' + 
			'</div>'+		
		'</div>'	
	);	
//------------------------------------------------------------------------------
// callback
//------------------------------------------------------------------------------		
	if (typeof callback === "function") { 
		callback(i); 
		
	} else if (typeof errorCallback === "function") { errorCallback("The success callback function passed in wasn't a function."); } // end if
} //end function
//------------------------------------------------------------------------------
function create_CH_Thumb_Title(PL_id, response, x, errorCallback, callback) {
    // jQuery.map() iterates through all of the items in the response and
    // creates a new array that only contains the specific property we're
    // looking for: channelId.
	var thumbs = $.map(response.items, function(item) {return item.snippet.thumbnails.default.url;});
	var titles = $.map(response.items, function(item) {return item.snippet.title;});
	var descripts = $.map(response.items, function(item) {return item.snippet.description;});	
	
	var channelThumbnail = thumbs[x];
	var channelTitle = replaceAll("Uploads from ", "", titles[x]);
	var CH_description = descripts[x];
	var CH_container = '#channelContainer_' + PL_id + ' ';
	
//------------------------------------------------------------------------------
// waypoint
//------------------------------------------------------------------------------	
	var channel = document.getElementById("channelContainer_" + PL_id);
	
	var waypoint = new Waypoint({ //determine div in viewport
		element: channel,
		handler: function(direction) {
			console.log(this.element.id + ' triggers at ' + this.triggerPoint + " - " + direction);
			div_in_viewport["id"] = channel.id;
			div_in_viewport["triggerPoint"] = this.triggerPoint;
		},
		context: document.getElementById('sidebar-content'),
		offset: -1
	});		
	
//------------------------------------------------------------------------------
// navigate playlist itemms
//------------------------------------------------------------------------------		
	var scrollTo = function(direction){
		var distance = (thumbnailWidth + em(0.5)) * 3;
		$(CH_container + ' .thumbnailsScrollArea').animate( { 
			scrollLeft: direction + distance
		}, 'fast', 'easeOutQuad' );			
	};
	
	$( CH_container + ' .nav-PL-Left' ).click(function () { scrollTo('-='); });
	$( CH_container + ' .nav-PL-Right' ).click(function () { scrollTo('+='); });	
	
//------------------------------------------------------------------------------
// Channel Title
//------------------------------------------------------------------------------	
	$( CH_container + '.CH_title' ).html( channelTitle );	
	
//------------------------------------------------------------------------------
// Display modal window when channel title is clicked
//------------------------------------------------------------------------------	
	$( CH_container + '.channelTitle-container *' )
		.click(function () {
			showModal(PL_id, CH_description);	
		});	
	
//------------------------------------------------------------------------------
// Channel Thumbnail
//------------------------------------------------------------------------------
	if ( (PL_id[0] == "U") && (PL_id[1] == "U") ) { //if playlist is uploads playlist	

		var CH_id = PL_id.replaceAt(1, "C");

		getChannelDetails(false, CH_id,
			function(errorMessage) { console.log(errorMessage); }, 
			function(response) {	

			var channelThumbnail = response.items[0].snippet.thumbnails.default.url;
			
			$( CH_container + '.channelThumbnail' ).attr("src", channelThumbnail);
			
		}); //end getChannelDetails
		
	} else if ( (PL_id[0] == "P") && (PL_id[1] == "L") ) { //if playlist is 
		
		$.ajax({
			type: "GET",
			url: "https://www.googleapis.com/youtube/v3/playlistItems",
			dataType: "json",
			data: {
				part: 'snippet',
				playlistId: PL_id,
				key: apiKey
			},
			async: true,
			success: function( data ) {

				var CH_id = $.map(data.items, function(item) { return item.snippet.channelId;} )[0];
				
				getChannelDetails(false, CH_id,
					function(errorMessage) { console.log(errorMessage); }, 
					function(response) {	

					var channelThumbnail = response.items[0].snippet.thumbnails.default.url;

					$( CH_container + '.channelThumbnail' ).attr("src", channelThumbnail);

				}); //end getChannelDetails
			}
		});		
	
	} else if ( (PL_id[0] == "W") && (PL_id[1] == "L") ) { //
	
		$( CH_container + '.channelThumbnail' ).attr("src", myChannel.snippet.thumbnails.default.url);
	}
//------------------------------------------------------------------------------
// callback
//------------------------------------------------------------------------------
	if (typeof callback === "function") { 
		callback(PL_id); 

	} else if (typeof errorCallback === "function") { errorCallback("The success callback function passed in wasn't a function."); } //end if
} // end function
//------------------------------------------------------------------------------
// Calls the Data API to retrieve the items in a particular playlist. In this
// example, we are retrieving a playlist of the user's
// uploaded videos. By default, the list returns the most recent videos first.
function playlistItems(PL_id, clickThumb, errorCallback, callback) {
	
	var request = gapi.client.youtube.playlistItems.list({
        playlistId: PL_id,
        part: 'snippet',
        pageToken: DB[PL_id].nextPageToken,
        maxResults: (DB[PL_id].items.length) ? 50 : maxResults.videos
    }); // end request
//------------------------------------------------------------------------------
    request.execute(function(response) {
		
        var totalResults = response.pageInfo.totalResults;
			DB[PL_id].nextPageToken = response.nextPageToken;
			DB[PL_id].pageInfo = response.pageInfo;

		if (!totalResults) { return document.getElementById("channelContainer_" + PL_id).remove() || false; //remove channels with 0 videos
			
		} else if ('error' in response) { return console.log(response.error.message) || false;
			
        } else if ('items' in response) {
			
			if (typeof callback === "function") {
				
				DB[PL_id].items = $.merge(DB[PL_id].items, response.items);
				
				callback(PL_id); //return result
				
			} else if (typeof errorCallback === "function") { errorCallback("The success callback function passed in wasn't a function."); } // end if
        } // end if
//------------------------------------------------------------------------------		
		if (!('nextPageToken' in response) || clickThumb) {
			return console.log("Exit recursion.") || false;

		} else {
//------------------------------------------------------------------------------
// If scrolled to the end
//------------------------------------------------------------------------------
			var elem = "#channelContainer_" + PL_id + " .thumbnailsContainer";

			var addNewContent = function () {
				return playlistItems(PL_id, clickThumb, errorCallback, callback);
			};
			// The one() method attaches one or more event handlers for the selected elements, and 
			// specifies a function to run when the event occurs.
			// In this case, the event is elem
			$(elem).one('addMoreVideosTo_' + PL_id, addNewContent); 

			// If thumbnailsScrollArea is scrolled
			$('#channelContainer_' + PL_id + ' .thumbnailsScrollArea').scroll(function() {
				// If #sidebar-content is scrolled
				if($(this).scrollLeft() + $(this).innerWidth() >= $(this)[0].scrollWidth - thumbnailWidth*3){
					// The trigger() method triggers the specified event
					// In this case, it triggers the custom event: elem
					$(elem).trigger('addMoreVideosTo_' + PL_id);
					return false;
				}
			});
		} //end if		
    }); // end request.execute
} // end function
//------------------------------------------------------------------------------
function eachPlaylistItem(PL_id, errorCallback, callback) {
	
	var totalResults = DB[PL_id].pageInfo.totalResults;
	var resultsPerPage  = DB[PL_id].pageInfo.resultsPerPage;	
	var IDs = $.map(DB[PL_id].items, function(item) {return item.snippet.resourceId.videoId;});
	var elem = $( '#channelContainer_' + PL_id + ' .PL-count' )
	var total = parseInt(elem[0].innerHTML, 10) + resultsPerPage;
	
		var animateBadge = function(unread){
			elem.animateNumber({ 
				number: unread,
				numberStep: $.animateNumber.numberStepFactories.append('+')
			});		
		};
		total = (total > totalResults) ? totalResults : total;
		animateBadge(total);
//------------------------------------------------------------------------------
	// Now that we know the IDs of all the videos in the uploads list,
	// we can create video thumbnails of uploads
	for (var i = 0; i < IDs.length; i++) {
		
		if ( !$( "#channelContainer_" + PL_id + " .thumbnailsContainer > #thumbnailContainer_" + IDs[i]).length ) {
			
			createVidThumbs(i, PL_id, 
				function(errorMessage) { console.log(errorMessage); }, 
				function(x) {
				
				Waypoint.refreshAll();
				
				// Check if video Id extist in Watch History playlist
				checkWatched(IDs[x], 
					function(errorMessage) { console.log(errorMessage); }, 
					function(response) {
					// jQuery.map() iterates through all of the items in the response and
					// creates a new array that only contains the specific property we're
					// looking for: videoId.				
					var watch_arr = $.map(response.items, function(item) {return item.snippet.resourceId.videoId;});

					// Remove watched videos
					removeWatchedVideos(watch_arr,
						function(errorMessage) { console.log(errorMessage); }, 
						function(watched) {
						
//						if (watched){ animateBadge(--total); }
					}); 				
				}); // end checkWatched					
			});
		} // end if
	} //end for
} //end function
//------------------------------------------------------------------------------
function createVidThumbs(i, PL_id, errorCallback, callback) {
	
	var IDs = $.map(DB[PL_id].items, function(item) {return item.snippet.resourceId.videoId;});
	var titles = $.map(DB[PL_id].items, function(item) {return item.snippet.title;});
	var descriptions = $.map(DB[PL_id].items, function(item) {return item.snippet.description;});
	
	var thumbs = $.map(DB[PL_id].items, function(item) {
		if (item.snippet.hasOwnProperty('thumbnails')) { return item.snippet.thumbnails.default.url; } 
			return false;
	});
	
	if (!(titles[i] == "Private video") && !(descriptions[i] == "This video is private.")){ //if error - e.g. a private video

//		var live_arr = $.map(DB[PL_id].items, function(item) {return item.snippet.liveBroadcastContent;});
		var publishedAt = $.map(DB[PL_id].items, function(item) {return item.snippet.publishedAt;});
			publishedAt[i] = replaceAll(".000Z", "", publishedAt[i]); //.000Z

		$("#channelContainer_" + PL_id + " .thumbnailsContainer").append(
			'<div class="thumbnailContainer" id="thumbnailContainer_' + IDs[i] + '">' + 
			
				'<div style="background-image: url(' + thumbs[i] + ');" class="videoThumbnail-default">' + 
					'<span class="label lb-watched"></span>' + 
					'<span class="label timeStamp"></span>' + 
				'</div>' + 

				'<div class="ch-vid-title">' + 
					'<a ' + 
						'href="//youtube.com/watch?v=' + IDs[i] + '&list=' + PL_id + '" ' + 
						'target="_blank" ' + 
						'class="thumbnailContainer">' + titles[i] + 
					'</a>' + 
				'</div>' +
			
			'</div>');
		
		$("#thumbnailContainer_" + IDs[i])
			.addClass( "bounceIn" )
			.click(function () {
				PL_current = PL_id;
				WH_current.push(IDs[i]);
			
				$("#" + this.id + " .lb-watched")
					.html( '<span class="glyphicon glyphicon-refresh"></span>' )
					.velocity( {rotateZ: "360deg"} );
			
				videoPlayback(
					function(errorMessage) { console.log(errorMessage); }, 
					function(index) {
				}); 		
			});			
	
		getDuration(IDs[i], 
			function(errorMessage) { console.log(errorMessage); }, 
			function(duration) {

			$("#thumbnailContainer_" + IDs[i] + " .timeStamp").html(duration);
		}); //end getDuration				

		if (typeof callback === "function") { 
			callback(i); 

		} else if (typeof errorCallback === "function") { errorCallback("The success callback function passed in wasn't a function."); }
		
	} else {
		return console.log("Video " + IDs[i] + " - " + descriptions[i]); 
	}
} // end function
//------------------------------------------------------------------------------
function getDuration(videoId, errorCallback, callback){

	$.ajax({
		type: "GET",
		url: "https://www.googleapis.com/youtube/v3/videos",
		dataType: "json",
		data: {
			part: "contentDetails, liveStreamingDetails",
			id: videoId,
			key: apiKey
		},
		async: true,
		success: function( response ) {
			
			if ('error' in response) { return console.log(response.error.message) || false;

			} else if (('items' in response) && (response.items.length > 0)) {

				//check if video is live streaming
				if ((response.items[0].hasOwnProperty('liveStreamingDetails')) &&
					(response.items[0].liveStreamingDetails.concurrentViewers || 0)	) {

					var time = document.createElement("span");
						time.className = "glyphicon glyphicon-play live-icon";
						time = time.outerHTML;

				} else {
					var duration = response.items[0].contentDetails.duration;
					var time = moment.duration(duration).format("h:mm:ss");
					if (time.length == 1) { time = "0:0" + time }
					if (time.length == 2) { time = "0:" + time }
				} //end if

				if (typeof callback === "function") { 
					callback(time); 

				} else if (typeof errorCallback === "function") { errorCallback("The success callback function passed in wasn't a function."); }
			} //end if	
		}			
	});
} // end function