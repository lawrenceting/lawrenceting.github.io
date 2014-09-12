google.load('visualization', '1.0', {'packages': ['corechart']});

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
    gapi.client.load('youtube', 'v3', function() {
        gapi.client.load('youtubeAnalytics', 'v1', function() {
//------------------------------------------------------------------------------
            // After both client interfaces load, use the Data API to request
            // information about the authenticated user's channel.
            // Get Subscriptions (Details and Thumbnails)
            subscriptionsList(10, '', [], [], [], [],
                function(errorMessage) { console.log(errorMessage); }, 
                function(result) {

                var addIds = result.addIds;
                var addTitle = result.addTitle;
                var addThumbnails = result.addThumbnails;
                var addDescription = result.addDescription;
                var nextPageToken = result.nextPageToken;
                var myChannelID = result.myChannelID;
                
                async(createDivs(addIds), null);
                async(createChannelThumbnails(addThumbnails, addIds, addTitle, addDescription), null);
                async(createLiveEvents(addIds), null);
//------------------------------------------------------------------------------
                var arr = []
                arr.push(myChannelID);
                //get watch history playlist id
                getPlaylistID(arr, [], "watchHistory", 0, 
                    function(errorMessage) { console.log(errorMessage); }, 
                    function(result) {

                    var watchHistoryID = result.playlistId;    
                    
                    async(uploads(addIds, myChannelID, watchHistoryID), null);
                });
                
                //removeEmptyChannels(addIds;
                
            });
        });
    });

    gapi.client.load('plus', 'v1', function() {
        googlePlus();
    });
}

//------------------------------------------------------------------------------
function createChannelThumbnails(channelThumbnails, channelIds, channelTitle, channelDescription) {
  for (var i = 0; i < channelIds.length; i++) {

    console.log("Creating channel thumbnail: " + channelIds[i]);

    var channelThumbnail = document.getElementById("channelThumbnail_" + channelIds[i]);
    //New Link
    //https://www.youtube.com/channel/[Channel ID]
    var newLink = document.createElement("a");
    newLink.href = '//youtube.com/channel/' + channelIds[i];
    channelThumbnail.insertBefore(newLink, channelThumbnail.firstChild);

    //Create channel thumbnail
    var newThumbnail = document.createElement("img");
    newThumbnail.src = channelThumbnails[i];
    newThumbnail.alt = channelTitle[i] + " - " + channelDescription[i];
    newLink.appendChild(newThumbnail);
    newLink.innerHTML += (channelTitle[i]);
  }
}
//------------------------------------------------------------------------------
function createLiveEvents(channelIds) {
  checkLiveEvents(channelIds,[], [], [], [], 0,
    function(errorMessage) { console.log(errorMessage); }, 
    function(result) {

      var addIds = result.addIds;
      var addTitle = result.addTitle;      
      var addThumbnails = result.addThumbnails;
      var addDescription = result.addDescription;
      var currentChannelID = result.currentChannelID;

      async(createLiveThumbnails(currentChannelID, addIds, addThumbnails, addTitle, addDescription), null);
  });
}
//------------------------------------------------------------------------------
function uploads(channelIds, myChannelID, watchHistoryID) {
  // Now that we know the channelIds of the subscriptions,
  // we can retrieve the upload playlist for each subscriptions.
    getPlaylistID(channelIds, [], "uploads", 0, 
        function(errorMessage) { console.log(errorMessage); }, 
        function(result) {

        var uploadsListId = result.playlistId;
        var currentChannelID = result.currentChannelID;
//------------------------------------------------------------------------------
        getPlaylistVideosID(uploadsListId, '', currentChannelID,
          function(errorMessage) { console.log(errorMessage); }, 
          function(result) {

            var videoIds = result.videoIds;
            var videoThumbnails = result.videoThumbnails;
            var totalResults = result.totalResults;
            
            async(createVideoThumbnails(videoIds, videoThumbnails, currentChannelID, uploadsListId), null);    
//------------------------------------------------------------------------------
            //Remove watched videos
            for (var i = 0; i < videoIds.length; i++) {

                getPlaylistVideosID(watchHistoryID, videoIds[i], currentChannelID,
                  function(errorMessage) { console.log(errorMessage); }, 
                  function(result) {

                    var id = result.videoIds;
                    var totalResults = result.totalResults;
                    
                    if (totalResults === 1) {
                        document.getElementById("uploadThumbnail_" + id[0]).remove();
                    }
                });
            }
        });
    });
}
//------------------------------------------------------------------------------
function removeEmptyChannels(videoIds) {

  for (var i = 0; i < videoIds.length; i++) {
      //''
    if( !$.trim( $('div#thumbnailsContainer_' + videoIds[i]).html() ).length ) {
        
    }
    //
  }
}
