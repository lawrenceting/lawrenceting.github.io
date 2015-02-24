$(window).load(function() { // executes when complete page is fully loaded, including all frames, objects and images
	
	$( "#tags" ).autocomplete({
		source: function( request, response ) {

			$.ajax({
				type: "GET",
				url: "https://www.googleapis.com/youtube/v3/search",
				dataType: "json",
				data: {
					part: 'snippet',
					q: request.term,
					type: 'channel',
					maxResults: 25,
					key: apiKey
				},
				async: true,
				success: function( data ) {

					var titles = $.map( data.items, function(item) { return item.snippet.title; } );
					var menuItems = [];

					for (i = 0; i < data.items.length; i++) {
						menuItems[i] = {
							label : titles[i],
							value : titles[i],
							data : data
						};
					}
					response( menuItems );
				}
			});
		},
		minLength: 1,
		autoFocus: true,
		select: function( event, ui ) {

			var data = ui.item.data; //response 
			var label = ui.item.label; //
			var IDs = $.map( data.items, function(item) { return item.snippet.channelId; } );
			var titles = $.map( data.items, function(item) { return item.snippet.title; } );							
			var index = _.indexOf(titles, label);
			var CH_id = IDs[index];
			var PL_id = [CH_id.replaceAt(1, "U")];

			if (!$("#sidebar-content").scrollTop()){ 
				div_in_viewport["id"] = $(".channelContainer:first-child").attr('id'); //if #sidebar-content is not scrolled, get first div of #content
			} 
			
			if (!document.getElementById("channelContainer_" + PL_id)) {

				playlists(PL_id.join(), 
					function(errorMessage) { console.log(errorMessage); }, 
					function(response) {

					generateThumbsDetails(PL_id, response, 
						function(errorMessage) { console.log(errorMessage); }, 
						function(PL_id) {
						
						$( "#channelContainer_" + PL_id )
							.insertAfter( $("#" + div_in_viewport["id"]) )
							.addClass( "bounceIn" );
						
//						$( "#sidebar-content" ).scrollTop( div_in_viewport["triggerPoint"] );
					});	
				});	//end playlists					
				
			} else {
				$( "#channelContainer_" + PL_id )
					.insertAfter( $("#" + div_in_viewport["id"]) )
					.addClass( "bounceIn" );
				
//				$( "#sidebar-content" ).scrollTop( div_in_viewport["triggerPoint"] );
			}
			
		},
		search: function( event, ui ) {							
			//
		}
	});
});