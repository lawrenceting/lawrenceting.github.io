// Helper function to display JavaScript value on HTML page.
function showResponse(response) {
    var responseString = JSON.stringify(response, '', 2);
    document.getElementById('response').innerHTML += responseString + 
    '<br>---------------------------------<br>';
}
//------------------------------------------------------------------------------
function async(your_function, callback) {
    setTimeout(function() {
        your_function;
        if (callback) {callback();}
    }, 0);
}
//------------------------------------------------------------------------------
// get list of subscriptions
function subscriptionsList(numSubsToRetrive,
                            nextPageToken, 
                            channelIds, 
                            channelThumbnails, 
                            channelTitle,
                            channelDescription, 
                            errorCallback,
                            callback) 
{
  //totalResults, channelIds, channelThumbnails, callback: do not change, leave value as is
  //totalSubs: number of subs to display, enter 'all' for all subs
  //maxResults: max results to retrieve, max value is 50

  var request = gapi.client.youtube.subscriptions.list({
      mine: true,
      part: 'snippet',
      maxResults: 50,
      order: 'unread',
      pageToken: nextPageToken,
      fields: 'items/snippet, nextPageToken, pageInfo'
  });  
  // part: 'id'
  // order: 'unread' or 'alphabetical' or 'relevance'

  // if number of subs to retrive is < 50, then set maxResults to that
  if (numSubsToRetrive <= request.B.rpcParams.maxResults) {
    request.B.rpcParams.maxResults = numSubsToRetrive;
  }

  request.execute(function(response) {

    var totalSubs = response.pageInfo.totalResults;
    var myChannelID = response.items[0].snippet.channelId;
    var maxResults = request.B.rpcParams.maxResults;
    nextPageToken = response.nextPageToken;

      // Termination condition to prevent infinite recursion
      if ((totalSubs === 0)) {
        console.log('There are no subscriptions.');
        displayMessage('There are no subscriptions.');
        return 0;
      }  
      if (numSubsToRetrive < 0) {
        console.log("numSubsToRetrive is less than 0.");
        return 0;
      }        
      else if (numSubsToRetrive > totalSubs) {
        console.log("numSubsToRetrive exceed totalSubs");
        return 0;
      } 
      else if ('error' in response) {
        displayMessage(response.error.message);
        return 0;
      } 
      else if ('items' in response) {
          // jQuery.map() iterates through all of the items in the response and
          // creates a new array that only contains the specific property we're
          // looking for: channelId.
          //https://www.youtube.com/channel/[Channel ID]
          var addIds = $.map(response.items, function(item) {
            return item.snippet.resourceId.channelId;});
          channelIds.push.apply(channelIds, addIds);

          var addThumbnails = $.map(response.items, function(item) {
            return item.snippet.thumbnails.default.url;});
          channelThumbnails.push.apply(channelThumbnails, addThumbnails);

          var addTitle = $.map(response.items, function(item) {
            return item.snippet.title;});
          channelTitle.push.apply(channelTitle, addTitle);

          var addDescription = $.map(response.items, function(item) {
            return item.snippet.description;});
          channelDescription.push.apply(channelDescription, addDescription);

          if (typeof callback === "function") {
             callback({
                        addIds: addIds,
                        addTitle: addTitle,
                        nextPageToken: nextPageToken,
                        addThumbnails: addThumbnails,
                        addDescription: addDescription,
                        myChannelID: myChannelID
            }); 
              
          } else if (typeof errorCallback === "function") {
            errorCallback("The success callback function passed in wasn't a function.");
          }
        } 

      console.log("totalSubs = " + totalSubs);
      console.log("numSubsToRetrive = " + numSubsToRetrive);
      console.log("nextPageToken = " + nextPageToken);
            
      if ((numSubsToRetrive == maxResults) || !('nextPageToken' in response)) {
          console.log("Exit recursion.");
          return 0;
      } 
      else {
        if (numSubsToRetrive > maxResults) { numSubsToRetrive -= maxResults; }
        // Recursive case
        return subscriptionsList( numSubsToRetrive,
                                  nextPageToken, 
                                  channelIds, 
                                  channelThumbnails, 
                                  channelTitle,
                                  channelDescription, 
                                  errorCallback,
                                  callback);
      }
  });
}
//------------------------------------------------------------------------------
function createChannelThumbnails(channelThumbnails, channelIds, channelTitle, channelDescription) {
  for (var i = 0; i < channelIds.length; i++) {

    console.log("Creating channel thumbnail: " + channelIds[i]);

    //Create div for channel
    var channel = document.createElement("div");
    channel.id = "channelContainer_" + channelIds[i];
    document.getElementById('content').appendChild(channel);

    //Create div for thumbnail
    var thumbnail = document.createElement("div");
    thumbnail.id = "channelThumbnail_" + channelIds[i];
    channel.insertBefore(thumbnail, channel.firstChild);

    //New Link
    //https://www.youtube.com/channel/[Channel ID]
    var newLink = document.createElement("a");
    newLink.href = '//youtube.com/channel/' + channelIds[i];
    thumbnail.insertBefore(newLink, thumbnail.firstChild);

    //Create channel thumbnail
    var newImg = document.createElement("img");
    newImg.src = channelThumbnails[i];
    newImg.alt = channelTitle[i] + " - " + channelDescription[i];
    newLink.appendChild(newImg);
    newLink.innerHTML += (channelTitle[i]);

    //Create div for video thumbnails
    var newDiv = document.createElement("div");
    newDiv.id = "videoThumbnails_" + channelIds[i];
    document.getElementById("channelContainer_" + channelIds[i]).appendChild(newDiv);
  };
}
//------------------------------------------------------------------------------
function checkLiveEvents(channelIds, 
                          LiveIds, 
                          LiveThumbnails, 
                          LiveTitle, 
                          LiveDescription, 
                          counter, 
                          errorCallback, 
                          callback) 
{
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        type: 'video',
        channelId: channelIds[counter],
        fields: 'items(id,snippet),pageInfo',
        eventType: 'live'
    }); 
    //UC1yBKRuGpC1tSM73A0ZjYjQ //UC52X5wxOL_s5yw0dQk7NtgA //UCSrZ3UV4jOidv8ppoVuvW9Q
    //maxResults: 50
 
   // Send the request to the API server,  
  request.execute(function(response) {

    // Termination condition to prevent infinite recursion
    if ('error' in response) {
      displayMessage(response.error.message);
      return 0;
    } 
    else if (counter >= channelIds.length) {
        console.log("counter exceed channelIds.length");
        return 0;
    }
    else {
      if ((response.pageInfo.totalResults > 0) && 
          (response.hasOwnProperty('items') == true)) {

          var addIds = $.map(response.items, function(item) {
            return item.id.videoId;});
          LiveIds.push(addIds); 

          var addThumbnails = $.map(response.items, function(item) {
            return item.snippet.thumbnails.default.url;});
          LiveThumbnails.push(addThumbnails); 

          var addTitle = $.map(response.items, function(item) {
            return item.snippet.title;});
          LiveTitle.push(addTitle);

          var addDescription = $.map(response.items, function(item) {
            return item.snippet.description;});
          LiveDescription.push(addDescription);

          var currentChannelID = request.B.rpcParams.channelId;

          //return result
          if (typeof callback === "function") {
            callback({
                        addIds: addIds,
                        addThumbnails: addThumbnails,
                        addTitle: addTitle,
                        addDescription: addDescription,
                        currentChannelID: currentChannelID
                      });

          } else if (typeof errorCallback === "function") {
            errorCallback("The success callback function passed in wasn't a function.");
          }

        } else {
          LiveIds.push([]);
          LiveThumbnails.push([]);
          LiveTitle.push([]);
          LiveDescription.push([]);
        }
      // Base case
      if (counter === (channelIds.length - 1)) {
        console.log("Exit recursion.");
        return 0;   
      } 
      counter++;
      // Recursive case
    return checkLiveEvents(channelIds, 
                            LiveIds, 
                            LiveThumbnails, 
                            LiveTitle, 
                            LiveDescription, 
                            counter, 
                            errorCallback, 
                            callback);
    }
  });
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
      newLink.insertBefore(newImg, newLink.firstChild);          
    }
}
//------------------------------------------------------------------------------
// input: array of channelIds, type (e.g. likes, favorites, uploads, watchHistory, watchLater)
// output: array of playlist ID 
function getPlaylistID(channelIds, 
                        playlistIds, 
                        type,
                        counter, 
                        errorCallback, 
                        callback)  
{
  // https://developers.google.com/youtube/v3/docs/channels/list
  var request = gapi.client.youtube.channels.list({
    part: 'contentDetails',
    id: channelIds[counter],
    fields: 'items/contentDetails/relatedPlaylists'
  });

  request.execute(function(response) {
    // Termination condition to prevent infinite recursion
    if ('error' in response) {
      displayMessage(response.error.message);
    } 
    else if (counter >= channelIds.length) {
        console.log("counter exceed channelIds.length");
        return 0;
    }
    else {
      // This string, of the form "UUdLFeWKpkLhkguiMZUp8lWA", is a unique ID
      // for a playlist of videos uploaded to the user's channel.
      
      var currentChannelID = request.B.rpcParams.id;
      var id = response.items[0].contentDetails.relatedPlaylists[type];
      playlistIds.push(id);
      console.log("Received " + type + " playlist " + counter + " - " + id);

        //return result
        if (typeof callback === "function") {
          callback({
                    playlistId: id,
                    currentChannelID: currentChannelID
                  });

        } else if (typeof errorCallback === "function") {
          errorCallback("The success callback function passed in wasn't a function.");
        }
      
      // Base case
      if (counter === (channelIds.length - 1)) {
        console.log("Exit recursion.");
        return 0;   
      } 
      counter++;
      // Recursive case
      return getPlaylistID(channelIds, 
                            playlistIds, 
                            type,
                            counter, 
                            errorCallback, 
                            callback
                          );
    }
  });
}
//------------------------------------------------------------------------------
// Calls the Data API to retrieve the items in a particular playlist. In this
// example, we are retrieving a playlist of the user's
// uploaded videos. By default, the list returns the most recent videos first.
function getUploadedVideosID(playlistId, errorCallback, callback) {
  // https://developers.google.com/youtube/v3/docs/playlistItems/list
  var request = gapi.client.youtube.playlistItems.list({
    playlistId: playlistId,
    part: 'snippet',
    maxResults: 2
  });
    //https://www.youtube.com/playlist?list=[playlistId]

  request.execute(function(response) {

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

        var videoThumbnails = $.map(response.items, function(item) {
          return item.snippet.thumbnails.default.url;
        });
        // Now that we know the IDs of all the videos in the uploads list,
        // we can retrieve info about each video.

        //return result
        if (typeof callback === "function") {
          callback({
                    videoIds: videoIds,
                    videoThumbnails: videoThumbnails
                  });

        } else if (typeof errorCallback === "function") {
          errorCallback("The success callback function passed in wasn't a function.");
        }

      } else {
        displayMessage('There are no videos in this channel.See upload playlist ' + playlistId);
      }
    }
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
// Helper method to display a message on the page.
function displayMessage(message) {
  $('#message').text(message).show();
}