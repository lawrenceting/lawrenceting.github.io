google.load('visualization', '1.0', {'packages': ['corechart']});

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
    gapi.client.load('youtube', 'v3', function() {
        gapi.client.load('youtubeAnalytics', 'v1', function() {
//------------------------------------------------------------------------------
            // After both client interfaces load, use the Data API to request
            // information about the authenticated user's channel.
            // Get Subscriptions (Details and Thumbnails)
            subscriptionsList(2, '', [], [], [], [],
                function(errorMessage) { console.log(errorMessage); }, 
                function(result) {

                var addIds = result.addIds;
                var addTitle = result.addTitle;
                var addThumbnails = result.addThumbnails;
                var addDescription = result.addDescription;
                var nextPageToken = result.nextPageToken;
                var myChannelID = result.myChannelID;

                async(createChannelThumbnails(addThumbnails, addIds, addTitle, addDescription), null);
                async(createLiveEvents(addIds), null);
//------------------------------------------------------------------------------
                var arr = []
                arr.push(myChannelID);
                //get watch history playlist id
                getPlaylistID(arr, [], "uploads", 0, 
                    function(errorMessage) { console.log(errorMessage); }, 
                    function(result) {

                    var watchHistoryID = result.playlistId;        

                    async(uploads(addIds, myChannelID, watchHistoryID), null);

                    //removeEmptyChannels(addIds);
                });
            });
        });
    });

    gapi.client.load('plus', 'v1', function() {
        googlePlus();
    });
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
        getUploadedVideosID(uploadsListId, 
          function(errorMessage) { console.log(errorMessage); }, 
          function(result) {

            var videoIds = result.videoIds;
            var videoThumbnails = result.videoThumbnails;
//------------------------------------------------------------------------------
            removeWatchedVideos(videoIds, videoThumbnails, watchHistoryID, 
              function(errorMessage) { console.log(errorMessage); }, 
              function(result) {

                var id = result.id;
                async(createVideoThumbnails(videoIds, videoThumbnails, currentChannelID, uploadsListId), null);    
            });
        });
    });
}
//------------------------------------------------------------------------------
function removeWatchedVideos(videoIds, videoThumbnails, watchHistoryID, errorCallback, callback){
    
    for (var i = 0; i < videoIds.length; i++) {

        var id = 123;

        getUploadedVideosID(watchHistoryID, 
          function(errorMessage) { console.log(errorMessage); }, 
          function(result) {

            //check if video exist in watch histpry playlist items
            // if no then create thumbnail
            // add input to get uploaded
            
            var videoIds = result.videoIds;
            var videoThumbnails = result.videoThumbnails;


            //

            if (typeof callback === "function") {
                 callback({
                    id: id,
                    thumbnail: thumbnail
                }); 

            } else if (typeof errorCallback === "function") {
                errorCallback("The success callback function passed in wasn't a function.");
            }
        });
    }
}
//------------------------------------------------------------------------------
function removeEmptyChannels(videoIds) {

  for (var i = 0; i < videoIds.length; i++) {
      //'div#videoThumbnails_'
      
    $('div#channelContainer_' + 'UCYfdidRxbB8Qhf0Nx7ioOYw').fadeOut();
  }
}
