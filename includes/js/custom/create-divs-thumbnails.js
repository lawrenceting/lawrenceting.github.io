//------------------------------------------------------------------------------
function generateThumbnails(response, errorCallback, callback) {
    // jQuery.map() iterates through all of the items in the response and
    // creates a new array that only contains the specific property we're
    // looking for: channelId.
    var addDescription = $.map(response.items, function(item) {
        return item.snippet.description;});
    var addThumbnails = $.map(response.items, function(item) {
        return item.snippet.thumbnails.default.url;});
    var addTitle = $.map(response.items, function(item) {
        return item.snippet.title;});
    var channelIds = $.map(response.items, function(item) {
        return item.snippet.resourceId.channelId;});
//------------------------------------------------------------------------------
	createDivs(channelIds, 
		function(errorMessage) { console.log(errorMessage); }, 
		function(i) {
		
		createChannelThumbnails(addThumbnails[i], channelIds[i], addTitle[i], addDescription[i]);
		createLiveEvents(channelIds[i]);

//    getRelatedPlaylistID(false, channelId, 
//        function(errorMessage) { console.log(errorMessage); }, 
//        function(result) {
//		
//		var uploadsListId = result["uploads"];
		//showResponse(channelIds[i]);
		uploads(channelIds[i]);		
//    }); // end getRelatedPlaylistID		
//------------------------------------------------------------------------------
		if (typeof callback === "function") {
			callback(); //return result
		} else if (typeof errorCallback === "function") {
			errorCallback("The success callback function passed in wasn't a function.");
		}		
	});
}
//------------------------------------------------------------------------------
function createDivs(channelIds, errorCallback, callback) {
	
    for (var i = 0; i < channelIds.length; i++) {
        if (!(document.getElementById("channelContainer_" + channelIds[i]))) {
            //Create div for channel
            var channel = document.createElement("div");
				channel.id = "channelContainer_" + channelIds[i];
				channel.className = "channelContainer";
				document.getElementById('content').appendChild(channel);

            //Create div for channel thumbnail
			//var channelList = document.getElementById('channelList');
            var channelThumbnail = document.createElement("div");
				channelThumbnail.id = "channelThumbnailContainer_" + channelIds[i];
				channelThumbnail.className = "channelThumbnailContainer media"; //
				channel.insertBefore(channelThumbnail, channel.firstChild);

            //Create div for scroll area
            var thumbnailsScrollArea = document.createElement("div");
				thumbnailsScrollArea.id = "thumbnailsScrollArea_" + channelIds[i];
				thumbnailsScrollArea.className = "thumbnailsScrollArea";
				channel.appendChild(thumbnailsScrollArea);

            //Create div for video thumbnails
            var thumbnailsContainer = document.createElement("div");
				thumbnailsContainer.id = "thumbnailsContainer_" + channelIds[i];
				thumbnailsContainer.className = "thumbnailsContainer";
				thumbnailsScrollArea.appendChild(thumbnailsContainer);

			$("#" + "channelContainer_" + channelIds[i]).append( "<hr>" );
			
            if (typeof callback === "function") {
                callback(i); 
            } else if (typeof errorCallback === "function") {
                errorCallback("The success callback function passed in wasn't a function.");
            } //end if
        } // end if
    } // end for
} // end function
//------------------------------------------------------------------------------
function createChannelThumbnails(channelThumbnail, channelId, channelTitle, channelDescription) {

	var thumbnail = document.createElement("div");
		thumbnail.style.backgroundImage="url(" + channelThumbnail + ")";	
		thumbnail.className = "channelThumbnail thumbnail pull-left"; //media-object // 
	
	var title = document.createElement("h4");
		title.className = "text-bold text-color-black"; // 
		title.innerHTML += (channelTitle);
	
	var newLink = document.createElement("a");
		newLink.href = '//youtube.com/channel/' + channelId; //https://www.youtube.com/channel/[Channel ID]
		newLink.appendChild(title);
		newLink.className = "pull-left"; // 
	
	var badge = document.createElement("span");
		badge.className = "badge pull-left"; //
		badge.innerHTML += '50+';
	
	var channelDiv = document.getElementById("channelThumbnailContainer_" + channelId);
		channelDiv.onclick = function (e) { 

			var $modal = $('#myModal').modal({
				  backdrop: true,
				  show: false,
				  keyboard: false
			});
			var showMsg = function (callback) {
				$modal
					.find('h4.modal-title').html(channelTitle).end()
					.find('.modal-body > h4').html("Description").end()
				    .find('.modal-body > p#myModalBody').html(channelDescription).end()
					.find('.callback-btn').html("Save").end()
    				.find('.callback-btn').off('click.callback')
					.on('click.callback', function(){
						if (typeof callback === "function") {
							callback("Callback Successful!"); 
						} else if (typeof errorCallback === "function") {
							errorCallback("The success callback function passed in wasn't a function.");
						}
						$modal.modal('hide');
					 }).end()				
					.modal('show');
			}; 
			showMsg(function(result) {
				alert(result);
			});
		};	
		channelDiv.appendChild(thumbnail);
		channelDiv.appendChild(newLink);
		channelDiv.appendChild(badge);	
} // end function
//------------------------------------------------------------------------------
function createThumbnails(i, type, videoIds, videoTitles, videoThumbnails, currentChannelID, uploadsListId) {
	
	var timeStamp = document.createElement("span");
		timeStamp.className = "label timeStamp ";
		getDuration(videoIds[i], 
			function(errorMessage) { console.log(errorMessage); }, 
			function(duration) {
			timeStamp.innerHTML += duration; 
		}); // 
	
	var unlikes = document.createElement("span");
		unlikes.className = "glyphicon glyphicon-thumbs-down unlikes";

	var likes = document.createElement("span");
		likes.className = "glyphicon glyphicon-thumbs-up likes";

	var thumbnail = document.createElement("div");
		thumbnail.id = "videoThumbnail-default_" + videoIds[i];
		thumbnail.className = "videoThumbnail-default";
		thumbnail.style.backgroundImage="url(" + videoThumbnails[i] + ")";	
		thumbnail.appendChild(timeStamp);
		thumbnail.appendChild(unlikes);
		thumbnail.appendChild(likes);
	
	//https://www.youtube.com/watch?v=[Video ID]&list=[Upload Playlist]
	var link = document.createElement("a");
		link.href = '//youtube.com/watch?v=' + videoIds[i] + '&list=' + uploadsListId;
		link.target = "_blank";
		link.innerHTML += videoTitles[i];
		link.className = "thumbnailContainer text-bold text-color-black";
	
	var container = document.createElement("div");
		container.id = "thumbnailContainer_" + videoIds[i];
		container.className = "thumbnailContainer";
		container.onclick = function (e) { 
			videoPlayback(i, type, videoIds, videoTitles, videoThumbnails, currentChannelID, uploadsListId); 
		};
		container.appendChild(thumbnail);	
		container.appendChild(link);

	var thumbnailsContainer = document.getElementById("thumbnailsContainer_" + currentChannelID);
	
	if (type=="uploads") {
		timeStamp.className += " label-danger";
		thumbnailsContainer.appendChild(container);
		
	} else if (type=="live") {
		timeStamp.className += " label-success";
		thumbnailsContainer.insertBefore(container, thumbnailsContainer.firstChild);
	} // end if
} // end function
//------------------------------------------------------------------------------
function getDuration(videoId, errorCallback, callback){

	$.ajax({
		url: "https://www.googleapis.com/youtube/v3/videos?" + 
				"part=contentDetails, liveStreamingDetails&" + 
				"id=" + videoId + "&" + 
				"fields=items(contentDetails,liveStreamingDetails)&" + 
				"key=" + apiKey
	}).done(function(response) {

        if ('error' in response) {
            console.log(response.error.message);
        } else {
            if ('items' in response) {
				
				//check if video is live streaming
				if ((response.items[0].hasOwnProperty('liveStreamingDetails') == true) &&
				   	(response.items[0].liveStreamingDetails.concurrentViewers || 0)	) {
					var time = "Live!"
					
				} else {
					var duration = response.items[0].contentDetails.duration;
					var time = moment.duration(duration).humanize();
					//var s = time.seconds();
					//var m = time.minutes();
					//var h = time.hours();
					//time = "" + h + ":" + m + ":" + s;
				} //end if
				
                //return result
                if (typeof callback === "function") {
                    callback(time);
                } else if (typeof errorCallback === "function") {
                    errorCallback("The success callback function passed in wasn't a function.");
                } // end if
            }
        } //end if		
	}); //end ajax
} // end function
