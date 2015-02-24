//------------------------------------------------------------------------------
// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
    gapi.client.load('plus', 'v1', function() {
        googlePlus();
    }); //end gapi.client.load('plus', 'v1', function()
//------------------------------------------------------------------------------	
    gapi.client.load('youtube', 'v3', function() {
		
		getChannelDetails(true, "",
			function(errorMessage) { console.log(errorMessage); }, 
			function(channel) {
			
			myChannel = channel.items[0];
			
			savedPlaylists.push(myChannel.contentDetails.relatedPlaylists.watchLater);
				// (e.g. likes, favorites, uploads, watchHistory, watchLater)
				//	watchHistory = HL6wTJp2FgN4NQF37E2y_OUQ
				//	watchLater = WL6wTJp2FgN4NQF37E2y_OUQ	
//------------------------------------------------------------------------------					
			generateMostWatchedChannel(
				function(errorMessage) { console.log(errorMessage); }, 
				function() {
//------------------------------------------------------------------------------
				// Get Subscriptions
				subscriptionsList("", 
					function(errorMessage) { console.log(errorMessage); }, 
					function(subs) {
//------------------------------------------------------------------------------					
					var PL_arr = $.map(subs.items, function(item) { return item.snippet.resourceId.channelId.replaceAt(1, "U"); });
					
					playlists(PL_arr.join(), 
						function(errorMessage) { console.log(errorMessage); }, 
						function(response) {

						generateThumbsDetails(PL_arr, response, 
							function(errorMessage) { console.log(errorMessage); }, 
							function(PL_id) {

							if (typeof callback === "function") {
								callback(PL_id);

							} else if (typeof errorCallback === "function") { errorCallback("The success callback function passed in wasn't a function."); }
						});	//end generateThumbsDetails
					});	//end playlists		
				}); //end subscriptionsList
			});
//------------------------------------------------------------------------------
			// After both client interfaces load, use the Data API to request
			// information about the authenticated user's channel.
			generateSavedPlaylists(
				function(errorMessage) { console.log(errorMessage); }, 
				function(PL_id) {
			});			
		}); //end getChannelDetails
	}); //end gapi.client.load('youtube', 'v3', function()
//------------------------------------------------------------------------------		
/*
	gapi.client.load('youtubeAnalytics', 'v1', function() {
		//
    }); //end gapi.client.load('youtubeAnalytics', 'v1', function()
*/	
} //end function
//------------------------------------------------------------------------------
var loaded = 0;
function subscriptionsList(nextPageToken, errorCallback, callback) {
	$('#loading-icon').velocity({ rotateZ: "360deg" });
	
// get list of subscriptions    
    var request = gapi.client.youtube.subscriptions.list({
        mine: true,
        part: 'snippet',
        maxResults: maxResults.channels,
        order: 'unread',
        pageToken: nextPageToken,
        fields: 'items/snippet, nextPageToken, pageInfo'
    }); //end request
        // order: 'unread' or 'alphabetical' or 'relevance'
//------------------------------------------------------------------------------
    request.execute(function(response) {
		nextPageToken = response.nextPageToken;

        // Termination condition to prevent infinite recursion
		if ('error' in response) { return console.log(response.error.message) || false;
			
        } else if ('items' in response) {
			
            if (typeof callback === "function") { 
				callback(response);
				
			} else if (typeof errorCallback === "function") { errorCallback("The success callback function passed in wasn't a function."); } //end if
        } //end if
//------------------------------------------------------------------------------
        if (!('nextPageToken' in response)) { return console.log("Exit recursion.") || false;
			
        } else {
			var addNewContent = function () {				
				return subscriptionsList(nextPageToken, errorCallback, callback);
				//$('#content').one( 'endofcontent', addNewContent); // rebind the event, if loading more content
			};
			// The one() method attaches one or more event handlers for the selected elements, and 
			// specifies a function to run when the event occurs.
			// In this case, the event is "endofcontent"			
			$('#content').one("endofcontent", addNewContent); 
			
			// If #sidebar-content is scrolled
			$('#sidebar-content').scroll(function() {
				// If #loadMore is scrolled into view
				if(isScrolledIntoView_v($('#loadMore'))) {
					// The trigger() method triggers the specified event
					// In this case, it triggers the custom event: "endofcontent"
					$('#content').trigger("endofcontent");  
					return false;
				}
			});
        }  //end if
		loaded += maxResults.channels
		console.log("Loaded a total of " + loaded + " channels.");		
    }); //end request.execute
} //end function
//------------------------------------------------------------------------------
function getChannelDetails(mine, CH_id, errorCallback, callback) {
    // https://developers.google.com/youtube/v3/docs/channels/list
    var request = gapi.client.youtube.channels.list({
        part: 'snippet, contentDetails',
        fields: 'items(contentDetails,snippet)'
    }); // end request

	var para = request.B.B.params;
	if ( mine ){ para.mine = mine; } 
		else { para.id = CH_id; } //end if
	
    request.execute(function(response) {
        if ('error' in response) { return console.log(response.error.message) || false;
			
        } else {
            // This string, of the form "UUdLFeWKpkLhkguiMZUp8lWA", is a unique ID
            // for a playlist of videos uploaded to the user's channel.
			// (e.g. likes, favorites, uploads, watchHistory, watchLater)
            if (typeof callback === "function") { 
				callback(response); //return result
				
            } else if (typeof errorCallback === "function") { errorCallback("The success callback function passed in wasn't a function."); } // end if
        } // end if
    }); // end request.execute
} // end function
//------------------------------------------------------------------------------
// Helper method to display a message on the page.
function displayMessage(message) {
	$('#message').text(message).show();
}
//------------------------------------------------------------------------------
// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('response').innerHTML += responseString + 
    '<br>---------------------------------<br>';
} //end function
//------------------------------------------------------------------------------
// Find replace string
//------------------------------------------------------------------------------
function replaceAll(find, replace, str) {
	return str.replace(new RegExp(find, 'g'), replace);
}
//------------------------------------------------------------------------------
// Count freq of array item in array
//------------------------------------------------------------------------------
function countFreq(arr) {
    var a = [], b = [], prev;
    
    arr.sort();
    for ( var i = 0; i < arr.length; i++ ) {
        if ( arr[i] !== prev ) {
            a.push(arr[i]);
            b.push(1);
        } else {
            b[b.length-1]++;
        }
        prev = arr[i];
    }
    return [a, b];
}
//------------------------------------------------------------------------------
// Replace Char in String by index
//------------------------------------------------------------------------------
String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}
//------------------------------------------------------------------------------
// If element isScrolledIntoView_v
//------------------------------------------------------------------------------
function isScrolledIntoView_v(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    //console.log(docViewTop, docViewBottom, elemTop, elemBottom);
    return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop));
} //end function
//------------------------------------------------------------------------------
// Convert em to px
//------------------------------------------------------------------------------
function em(input) {
    var emSize = parseFloat($("body").css("font-size"));
    return (emSize * input);
}
//------------------------------------------------------------------------------
// Sort two array with same position
//------------------------------------------------------------------------------
function sortTwoArrays(array1, array2) {
	var zipped = [],
		i;

	for(i=0; i<array1.length; ++i) {
		zipped.push({
			array1elem: array1[i],
			array2elem: array2[i]
		});
	}

	zipped.sort(function(left, right) {
		var leftArray1elem = left.array1elem,
			rightArray1elem = right.array1elem;

		return leftArray1elem === rightArray1elem ? 0 : (leftArray1elem < rightArray1elem ? -1 : 1);
	});

	array1 = [];
	array2 = [];
	for(i=0; i<zipped.length; ++i) {
		array1.push(zipped[i].array1elem);
		array2.push(zipped[i].array2elem);
	}
	return {array1: array1, array2: array2};
}
