//------------------------------------------------------------------------------
// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
    gapi.client.load('plus', 'v1', function() {
        googlePlus();
    });
    gapi.client.load('youtube', 'v3', function() {
        gapi.client.load('youtubeAnalytics', 'v1', function() {
            // After both client interfaces load, use the Data API to request
            // information about the authenticated user's channel.
//------------------------------------------------------------------------------
            getRelatedPlaylistID(true, "",
                function(errorMessage) { console.log(errorMessage); }, 
                function(relatedPlaylists) {
                
                watchHistoryID = relatedPlaylists["watchHistory"]; //HL6wTJp2FgN4NQF37E2y_OUQ
                // (e.g. likes, favorites, uploads, watchHistory, watchLater)       
//------------------------------------------------------------------------------
                // Get Subscriptions (Details and Thumbnails)
                subscriptionsList("", 
                    function(errorMessage) { console.log(errorMessage); }, 
                    function(response) {
//------------------------------------------------------------------------------                    
                    generateThumbnails(response,
                        function(errorMessage) { console.log(errorMessage); }, 
                        function() { //requires watchHistoryID
                        
                    }); //end generateThumbnails
                }); //end subscriptionsList
//------------------------------------------------------------------------------
                generateMostWatchedChannel();
//------------------------------------------------------------------------------                
            }); //end currentUserChannelRelatedPlaylists
        }); //end gapi.client.load('youtube', 'v3', function()
    }); //gapi.client.load('youtubeAnalytics', 'v1', function()
} //end function
//------------------------------------------------------------------------------
// get list of subscriptions
function subscriptionsList(nextPageToken, errorCallback, callback) {
    
	//Get thumbnail height
    var thumbnailHeight = parseInt($(".channelThumbnail").css("height"), 10);
    
    if (!(thumbnailHeight || 0)) {
        var tempDiv = document.createElement("div");
            tempDiv.className = "channelThumbnail";
            document.body.appendChild(tempDiv);
            thumbnailHeight = parseInt($(".channelThumbnail").css("height"), 10);
            tempDiv.remove();
    }
    var maxResults = Math.ceil(screen.height/thumbnailHeight); 
    if (maxResults > 50) {maxResults = 50; console.log("maxResults > 50");}
    
    var request = gapi.client.youtube.subscriptions.list({
        mine: true,
        part: 'snippet',
        maxResults: maxResults,
        order: 'unread',
        pageToken: nextPageToken,
        fields: 'items/snippet, nextPageToken, pageInfo'
    }); //end request
        // order: 'unread' or 'alphabetical' or 'relevance'
        // maxResults: max results to retrieve, max value is 50
//------------------------------------------------------------------------------
    request.execute(function(response) {
        var totalSubs = response.pageInfo.totalResults;
        var resultsPerPage = response.pageInfo.resultsPerPage;

        // Termination condition to prevent infinite recursion
        if ((totalSubs === 0)) {
            console.log('There are no subscriptions.');
            return 0;
        }  
        else if ('error' in response) {
            console.log(response.error.message);
            return 0;
        } 
        else if ('items' in response) {
            if (typeof callback === "function") {
                callback(response); 
            } else if (typeof errorCallback === "function") {
                errorCallback("The success callback function passed in wasn't a function.");
            }
        } 

        if ((resultsPerPage >= totalSubs) || !('nextPageToken' in response)) {
            console.log("Exit recursion.");
            return 0;
        } 
        else {
            nextPageToken = response.nextPageToken;
//------------------------------------------------------------------------------
// If scrolled to the end
//------------------------------------------------------------------------------
			$('#content').bind('scroll', function(){
				if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight){
					return subscriptionsList(nextPageToken, errorCallback, callback); 
				}
			});			
//------------------------------------------------------------------------------
// If window is resized
//------------------------------------------------------------------------------
/*			
            $(window).resize(function() {
                var top_level_div = document.getElementById('content');
                var count = top_level_div.getElementsByClassName('channelContainer').length;

				if (count < maxResults) { 
                    return subscriptionsList(nextPageToken, errorCallback, callback); 
                }
            });
*/			
//------------------------------------------------------------------------------			
        }  //end if
    }); //end request.execute
}
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
}
//------------------------------------------------------------------------------
function replaceAll(find, replace, str) {
	return str.replace(new RegExp(find, 'g'), replace);
}
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