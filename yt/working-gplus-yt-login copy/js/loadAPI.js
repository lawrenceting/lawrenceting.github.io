google.load('visualization', '1.0', {'packages': ['corechart']});

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
  gapi.client.load('youtube', 'v3', function() {
    gapi.client.load('youtubeAnalytics', 'v1', function() {
//------------------------------------------------------------------------------
      // After both client interfaces load, use the Data API to request
      // information about the authenticated user's channel.
      // Get Subscriptions (Details and Thumbnails)
      subscriptionsList(5, '', [], [], [], [],
        function(errorMessage) { console.log(errorMessage); }, 
        function(result) {

        var addIds = result.addIds;
        var myChannelID = result.myChannelID;
        var addTitle = result.addTitle;
        var addThumbnails = result.addThumbnails;
        var addDescription = result.addDescription;
        var nextPageToken = result.nextPageToken;

        createChannelThumbnails(addThumbnails, addIds, addTitle, addDescription); 
        createLiveEvents(addIds);
        uploads(addIds, myChannelID);
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

      console.log("Creating live video thumbnail: " + currentChannelID);
      createLiveThumbnails(currentChannelID, addIds, addThumbnails, addTitle, addDescription);
  });
}
//------------------------------------------------------------------------------
function createVideoThumbnails(videoIds, videoThumbnails, currentChannelID, uploadsListId) 
{
  //Create video thumbnails and link
  for (var i = 0; i < videoIds.length; i++) {
    //https://www.youtube.com/watch?v=[Video ID]&list=[Upload Playlist]
    var newLink = document.createElement("a");
    newLink.href = '//youtube.com/watch?v=' + videoIds[i] + '&list=' + uploadsListId;
    document.getElementById("videoThumbnails_" + currentChannelID).appendChild(newLink);

    var newImg = document.createElement("img");
    newImg.src = videoThumbnails[i];
    newLink.appendChild(newImg);
  }
}
//------------------------------------------------------------------------------
function createLiveThumbnails(currentChannelID, LiveIds, LiveThumbnails, LiveTitle, LiveDescription) 
{
    for (var i = 0; i < LiveIds.length; i++) {
      //New Link
      var newLink = document.createElement("a");
      newLink.href = '//youtube.com/watch?v=' + LiveIds[i];
      document.getElementById("videoThumbnails_" + currentChannelID).appendChild(newLink);

      //Create video thumbnail
      var newImg = document.createElement("img");
      newImg.src = LiveThumbnails[i];
      newImg.alt = LiveTitle[i] + " - " + LiveDescription[i];
      newLink.appendChild(newImg);          
    }
}










//------------------------------------------------------------------------------
function getWatchHistoryID(channelIds, channelThumbnails, uploadsListIds, myChannelID) {
  var arr = []
  arr.push(myChannelID);

  getPlaylistID(arr, [], "watchHistory", 0, 
    function(errorMessage) { console.log(errorMessage); }, 
    function(result) {

    var watchHistoryID = result.playlistIds;

    doSomething(channelIds, 
              channelThumbnails, 
              uploadsListIds, 
              myChannelID, 
              watchHistoryID)
  });  
}
//------------------------------------------------------------------------------
function doSomething(channelIds, 
                      channelThumbnails, 
                      uploadsListIds, 
                      myChannelID, 
                      watchHistoryID) 
{
  console.log("channelIds: ");          console.log(channelIds);
  console.log("myChannelID: ");         console.log(myChannelID);
  console.log("watchHistoryID: ");      console.log(watchHistoryID);
  console.log("uploadsListIds: ");      console.log(uploadsListIds);
  console.log("channelThumbnails: ");   console.log(channelThumbnails);

 for (var i = 0; i < channelIds.length; i++) {
   getUploadedVideosID( uploadsListIds[i], channelThumbnails[i], i );
 };
}
