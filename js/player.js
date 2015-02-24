var player;
var PL_current = savedPlaylists[0];
var WH_current = [];
//------------------------------------------------------------------------------
$( window ).load(function(e) { 
	
// executes when complete page is fully loaded, including all frames, objects and images	
	
	// For information about the Google Chart Tools API, see
	// https://developers.google.com/chart/interactive/docs/quick_start
	var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";

	var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);	
	
	var step = 0.1;
	
	$( "#slider-range-max" ).slider({
		orientation: "horizontal",
		animate: true,
		range: "max",
		min: -1,
		max: 3,
		step: step,
		value: 1,
		slide: function( event, ui ) {
			$( "#amount" ).val( ui.value );
			player.setPlaybackRate(ui.value); //http://jsfiddle.net/rocha/eMAU5/

		}
	}).slider("pips" , {
		rest: "label", 
		step: 1/step
	});
	$( "#amount" ).val( $( "#slider-range-max" ).slider( "value" ) );	
});
//------------------------------------------------------------------------------
function videoPlayback(errorCallback, callback) {
	
	var PL_id = PL_current;
	var totalResults = DB[PL_id].pageInfo.totalResults;	
	var IDs = $.map(DB[PL_id].items, function(item) { return item.snippet.resourceId.videoId; });
	var index = IDs.indexOf(_.last(WH_current));
	
	
	//implement add playlist to load playlist
	if (IDs.length < totalResults){
		
		if ((IDs.length - index) >= 50){
			loadPL(index);
			
			playlistItems(PL_id, true, 
				function(errorMessage) { console.log(errorMessage); }, 
				function(PL_id) {

				eachPlaylistItem(PL_id, 
					function(errorMessage) { console.log(errorMessage); }, 
					function() {
				}); //end eachPlaylistItem
			}); // end playlistItems			

		} else  {
			playlistItems(PL_id, true, 
				function(errorMessage) { console.log(errorMessage); }, 
				function(PL_id) {

				loadPL(index);

				eachPlaylistItem(PL_id, 
					function(errorMessage) { console.log(errorMessage); }, 
					function() {
				}); //end eachPlaylistItem
			}); // end playlistItems			
		}
	} else { loadPL(index); }
} //end function
//------------------------------------------------------------------------------
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
function onYouTubeIframeAPIReady() {
	player = new YT.Player('player', {
		height: '390',
		width: '640',
		videoId: '',
		playerVars: {
			html5: 1,
			autohide: 0,
			autoplay: 0,
			cc_load_policy: 1,
			controls: 2,
			disablekb: 0,
			enablejsapi: 1,
			fs: 1,
			iv_load_policy: 1,
			list: PL_current,
			listType: 'playlist',
			loop: 0,
			modestbranding: 1,
			rel: 0,
			showinfo: 1,
			theme: 'light'
		},
		events: {
			'onReady': onPlayerReady,
			'onPlaybackQualityChange': onPlayerPlaybackQualityChange,
			'onStateChange': onPlayerStateChange,
			'onPlaybackRateChange': onPlaybackRateChange,
			'onError': onPlayerError
		}
	});
}
//------------------------------------------------------------------------------
// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
	
	player.setVolume(100);	
}
//------------------------------------------------------------------------------
// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
function onPlayerStateChange(event) {
	
	var PL_id = PL_current;
	var IDs = $.map(DB[PL_id].items, function(item) { return item.snippet.resourceId.videoId; });
	var totalResults = DB[PL_id].pageInfo.totalResults;
	var videoId = player.getVideoData().video_id;
	var index = player.getPlaylistIndex();	
	
	switch(event.data) {
//------------------------------------------------------------------------------			
		case YT.PlayerState.PLAYING:   
			
			$( "#slider-range-max" ).slider( "value", 1 );
				player.unMute();
				NProgress.done();

			infoTab(index, PL_id, 
				function(errorMessage) { console.log(errorMessage); }, 
				function() {
			}); 
			
			var watched = _.without(WH_current, videoId);
			
			playerStatus(watched, "ok",
				function(errorMessage) { console.log(errorMessage); }, 
				function(l) {
				
				WH_current = [videoId]; //set WH_current to current video
			});
			
			playerStatus([videoId], "play",
				function(errorMessage) { console.log(errorMessage); }, 
				function(watched) {
			});			
			
			collaspeSidebar();
			
			break;
//------------------------------------------------------------------------------	
		case YT.PlayerState.PAUSED:
			
			playerStatus([videoId], "pause",
				function(errorMessage) { console.log(errorMessage); }, 
				function(watched) {
			});
			break;
//------------------------------------------------------------------------------
		case YT.PlayerState.ENDED:
			
			loadPL(index);

			if (IDs.length < totalResults){		
				playlistItems(PL_id, true, 
					function(errorMessage) { console.log(errorMessage); }, 
					function(PL_id) {

					eachPlaylistItem(PL_id, 
						function(errorMessage) { console.log(errorMessage); }, 
						function() {
					}); //end eachPlaylistItem
				}); // end playlistItems
			}		

			break;
//------------------------------------------------------------------------------			
		default:                     // If all else fails...
			// Execute code block #4.
			break;                     // stop here
	}	
//------------------------------------------------------------------------------	
//		console.log(event.data);
//		console.log(player.getVideoBytesLoaded());
//		console.log(player.getVideoData());
//		console.log(player.getDebugText());
//		console.log(player.mute());
//		console.log(YT.PlayerState);
//		player.getPlaylist();
//		player.getVideoBytesTotal()
//		player.unMute()
//		player.cueVideoById("bHQqvYy5KYo", 5, "large");
//		player.getApiInterface()	
//		setTimeout(stopVideo, 0);	
//		player.stopVideo();	
//		player.playVideo();	
}
//------------------------------------------------------------------------------
function playerStatus(Ids, status, errorCallback, callback) {
			
	for ( var i = 0; i < Ids.length; i++ ) {
		$("#thumbnailContainer_" + Ids[i] + " .lb-watched").html( 
			'<span class="glyphicon glyphicon-' + status + '"></span>' 
		);
	}	

	if (typeof callback === "function") { 
		callback(Ids.length); 

	} else if (typeof errorCallback === "function") { errorCallback("The success callback function passed in wasn't a function."); }
} // end function


//------------------------------------------------------------------------------
function loadPL(index) {
	NProgress.configure({ showSpinner: false, parent: 'body' });	
	NProgress.start(); NProgress.set(0.7);
	
	var IDs = $.map(DB[PL_current].items, function(item) {return item.snippet.resourceId.videoId;});

	player.loadPlaylist({
		playlist: IDs,
		listType: 'playlist',
		index: index,
		startSeconds: 0,
		suggestedQuality: 'hd720'
	});
}
//------------------------------------------------------------------------------
function onPlayerPlaybackQualityChange(event) {
}
function onPlayerError(event) {
}
function onPlaybackRateChange(event) {
}