//--------------------------------------------------------------------
// Player
//--------------------------------------------------------------------
// For information about the Google Chart Tools API, see
// https://developers.google.com/chart/interactive/docs/quick_start
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
	  height: '390',
	  width: '640',
	  videoId: 'M7lc1UVf-VE',
	  events: {
		'onReady': onPlayerReady,
		'onStateChange': onPlayerStateChange
	  }
	});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
	if (event.data == YT.PlayerState.PLAYING && !done) {
	  setTimeout(stopVideo, 0);
	  done = true;
	}
}
function stopVideo() {
	player.stopVideo();
}	
//------------------------------------------------------------------------------
function videoPlayback(i, type, videoIds, videoTitles, videoThumbnails, currentChannelID, uploadsListId) {

	var $modal = $('#videoPlayback-container').modal({
		  backdrop: true,
		  show: false,
		  keyboard: false
	});
	var showMsg = function (callback) {
		$modal
			.find('h4.modal-title').html(videoTitles[i]).end()
			.find('button.btn-close').off('click.callback')
			.on('click.callback', function(){
				if (typeof callback === "function") {
					callback("Callback Successful!"); 
				} else if (typeof errorCallback === "function") {
					errorCallback("The success callback function passed in wasn't a function.");
				}
			 }).end()
	}; 
	showMsg(function(result) {
		var content = document.getElementById("content");
			content.className = "col-md-12";
		
		$("#player-container").hide();
	});	
	
	var player = document.getElementById("player");
		player.className = "embed-responsive-item";	
		player.height = "" + screen.height/2 + "px";
		player.width = "100%";
}