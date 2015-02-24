//------------------------------------------------------------------------------
function infoTab(i, PL_id, errorCallback, callback){
	
	var Ids = $.map(DB[PL_id].items, function(item) {return item.snippet.resourceId.videoId;});
	var titles = $.map(DB[PL_id].items, function(item) {return item.snippet.title;});
	var publishedAt = $.map(DB[PL_id].items, function(item) {return item.snippet.publishedAt;});
	var descriptions = $.map(DB[PL_id].items, function(item) {return item.snippet.description;});	
//------------------------------------------------------------------------------	
	var $modal = $('#player-container, #rightpane').modal({
		  backdrop: true,
		  show: false,
		  keyboard: false
	});
	var showMsg = function (callback) {

		var description = replaceAll("\n", "<br>", descriptions[i]);
			description = Autolinker.link( description, { newWindow: true } );

		var channelThumb = $( '#channelContainer_' + PL_id + ' .channelThumbnail' )[0].outerHTML;

		$modal
			.find('h4.media-heading > a#video-title').html(titles[i]).end()
			.find('h4.media-heading > a#video-link').attr({ href: '//www.youtube.com/watch?v=' + Ids[i] + '&list=' + PL_id }).end()
			.find('div.media > a.pull-left').html(channelThumb).end()
			.find('small#publishDate').html(publishedAt[i]).end()	
			.find('small#vid_description').html(description).end()
			.find('button.btn-close').off('click.callback')
			.on('click.callback', function(){
				if (typeof callback === "function") {
					callback("Callback Successful!"); 
					
				} else if (typeof errorCallback === "function") { errorCallback("The success callback function passed in wasn't a function."); }
			 }).end()
	}; 
	showMsg(function(result) {
		alert("yo!");
	});	
	
	$( '#player-container .channelTitle-container *' ).click(function () {
		showModal(PL_id, descriptions[i]);
	});	
	
	if (typeof callback === "function") {
		callback(); //return result

	} else if (typeof errorCallback === "function") { errorCallback("The success callback function passed in wasn't a function."); }	
}
//------------------------------------------------------------------------------	
$( window ).load(function(e) { 
	$( "#speed" ).selectmenu(); 
});