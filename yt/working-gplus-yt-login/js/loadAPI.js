google.load('visualization', '1.0', {'packages': ['corechart']});

// Load the API and make an API call.  Display the results on the screen.
function makeApiCall() {
  gapi.client.load('youtube', 'v3', function() {
    gapi.client.load('youtubeAnalytics', 'v1', function() {
      // After both client interfaces load, use the Data API to request
      // information about the authenticated user's channel.
        getSubscriptions(0, 6, 50, '', [], []);
    });
  });

  gapi.client.load('plus', 'v1', function() {
    googlePlus();
  });
}
//------------------------------------------------------------------------
// Get Subscriptions (Details and Thumbnails)
//------------------------------------------------------------------------
function getSubscriptions(totalResults, 
                          totalSubs,
                          maxResults, 
                          pageToken, 
                          channelIds, 
                          channelThumbnails
                          ) 
{
    if (totalSubs < maxResults) {maxResults = totalSubs;}

    var request = gapi.client.youtube.subscriptions.list({
      mine: true,
      part: 'snippet',
      maxResults: maxResults,
      order: 'unread',
      pageToken: pageToken
    });  
    // part: 'id'
    // order: 'unread' or 'alphabetical' or 'relevance'

  request.execute(function(response) {

    if (totalSubs === 'all') {totalSubs = response.pageInfo.totalResults;}

    console.log("Total subs = " + totalSubs);
    console.log("Total results = " + totalResults);

      // Termination condition to prevent infinite recursion
      if ((totalSubs === 0)) {
        console.log("Total totalsubs is 0");
        return 0;
      }  // Termination condition to prevent infinite recursion
      else if (totalResults > totalSubs) {
        console.log("totalResults exceed totalSubs");
        return 0;
      } 
      else if ('error' in response) {
        displayMessage(response.error.message);
        return 0;
      } // Base case
      else if ((totalResults === totalSubs)) {
        console.log("Exit recursion. Total result is " + totalResults + ".");

        // Now that we know the channelIds of the subscriptions,
        // we can retrieve the upload playlist for each subscriptions.
        for (var i = 0; i < totalSubs; i++) {
          getUploadsPlaylistID(channelIds[i], channelThumbnails[i], i);  
        }
        return 0;
      }
      else { 
        if ('items' in response) {
          // jQuery.map() iterates through all of the items in the response and
          // creates a new array that only contains the specific property we're
          // looking for: channelId.
          //https://www.youtube.com/channel/[Channel ID]
          var addIds = $.map(response.items, function(item) {
            return item.snippet.resourceId.channelId;
          });
          channelIds.push.apply(channelIds, addIds);

          var addThumbnails = $.map(response.items, function(item) {
            return item.snippet.thumbnails.default.url;
          });
          channelThumbnails.push.apply(channelThumbnails, addThumbnails);

        } else {
          displayMessage('There are no subscriptions.');
        }
      }

      totalResults += (response.pageInfo.resultsPerPage);
      pageToken = response.nextPageToken;
      console.log(pageToken);

      if ((totalSubs - totalResults) < maxResults) {
        pageToken = '';
        maxResults = (totalSubs - totalResults);
      }
      // Recursive case
      getSubscriptions( totalResults,
                        totalSubs, 
                        maxResults, 
                        pageToken, 
                        channelIds, 
                        channelThumbnails
                      );
  });
}

function newUploads(){
  var request = gapi.client.youtube.activities.list({
    part: 'contentDetails,snippet',
    home: true,
    maxResults: 1
  });

  request.execute(function(response) {
    //showResponse(response);

  });
}

// get uploads ID of YouTube channel
function getUploadsPlaylistID(channelId, channelThumbnail, channelNum) {
  // https://developers.google.com/youtube/v3/docs/channels/list
  var request = gapi.client.youtube.channels.list({
    part: 'contentDetails',
    id: channelId,
  });

  request.execute(function(response) {

    if ('error' in response) {
      displayMessage(response.error.message);
    } else {
      // This string, of the form "UUdLFeWKpkLhkguiMZUp8lWA", is a unique ID
      // for a playlist of videos uploaded to the user's channel.
      var uploadsListId = response.items[0].contentDetails.relatedPlaylists.uploads;
      // Use the uploads playlist ID to retrieve the list of uploaded videos.

      getUploadedVideosID(uploadsListId, 
                          channelThumbnail, 
                          channelNum, 
                          false
                         ); 
    }
  });
}

// Calls the Data API to retrieve the items in a particular playlist. In this
// example, we are retrieving a playlist of the user's
// uploaded videos. By default, the list returns the most recent videos first.
function getUploadedVideosID( uploadsListId, 
                              channelThumbnail, 
                              channelNum, 
                              recurse
                            ) 
{
  // https://developers.google.com/youtube/v3/docs/playlistItems/list
  var request = gapi.client.youtube.playlistItems.list({
    playlistId: uploadsListId,
    part: 'snippet',
    maxResults: 5
  });
    //https://www.youtube.com/playlist?list=[playlistId]

  request.execute(function(response) {
/*
    if (recurse == true) {
      showResponse(response);
      console.log("Exit recursion."); 
      return response;
    }
*/
    if ('error' in response) {
      displayMessage(response.error.message);
    } else {
      if ('items' in response) {
        // jQuery.map() iterates through all of the items in the response and
        // creates a new array that only contains the specific property we're
        // looking for: videoId.
        var videoIds = $.map(response.items, function(item) {
          return item.snippet.resourceId.videoId;
        });

        //for (var i = 0; i < videoIds.length; i++) {
          //var watchHistory = getUploadedVideosID(uploadsListId, '', '', true);
          //console.log(watchHistory);
        //}

        var videoThumbnails = $.map(response.items, function(item) {
          return item.snippet.thumbnails.default.url;
        });
        // Now that we know the IDs of all the videos in the uploads list,
        // we can retrieve info about each video.
        generateChannel(
          videoIds, 
          videoThumbnails, 
          channelThumbnail, 
          channelNum, 
          uploadsListId
        );

      } else {
        displayMessage('There are no videos in channel no. ' + channelNum);
      }
    }
  });
}

function generateChannel( videoIds, 
                          videoThumbnails, 
                          channelThumbnail, 
                          channelNum, 
                          uploadsListId
                        ) 
{
  console.log(channelNum);
  console.log(videoIds);
  console.log(videoThumbnails);
  console.log(channelThumbnail);
  console.log(uploadsListId);

  //Create div
  var newDiv = document.createElement("div");
  newDiv.id = "channel_" + channelNum;
  document.getElementById('content').appendChild(newDiv);

  //Create channel thumbnail
  var newImg = document.createElement("img");
  newImg.src = channelThumbnail;
  newDiv.appendChild(newImg);

  //Create video thumbnails and link
  for (var i = 0; i < videoIds.length; i++) {

    newLink = document.createElement("a");
    newLink.href = '//youtube.com/watch?v=' + videoIds[i] + '&list=' + uploadsListId;
    newDiv.appendChild(newLink);

    newImg = document.createElement("img");
    newImg.src = videoThumbnails[i];
    newLink.appendChild(newImg);
  }
  //https://www.youtube.com/watch?v=[Video ID]&list=[Upload Playlist]
  //newDiv.innerHTML += str;
  //document.getElementById(newDiv.id).appendChild(newDiv);
}
