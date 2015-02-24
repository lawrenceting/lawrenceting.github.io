//------------------------------------------------------------------------------
function generateSavedPlaylists(errorCallback, callback){
	
	generateSavedPlaylists = Function(""); // overwrite this function, so it will be executed only once
	
	playlists(savedPlaylists.join(), 
		function(errorMessage) { console.log(errorMessage); }, 
		function(response) {

		generateThumbsDetails(savedPlaylists, response, 
			function(errorMessage) { console.log(errorMessage); }, 
			function(PL_id) {
			
			if (typeof callback === "function") {
				callback(PL_id);
				
			} else if (typeof errorCallback === "function") { errorCallback("The success callback function passed in wasn't a function."); }
		});	
	});	//end playlists
} //end function
//------------------------------------------------------------------------------
function playlists(PL_id, errorCallback, callback){
    var request = gapi.client.youtube.playlists.list({
        part: 'snippet',
		id: PL_id,
        fields: 'items'
    }); // end request

    request.execute(function(response) {
        if ('error' in response) { return console.log(response.error.message) || false;
			
        } else if ('items' in response) {
			
			if (typeof callback === "function") { 
				callback(response);
				
			} else if (typeof errorCallback === "function") { errorCallback("The success callback function passed in wasn't a function."); } // end if
        } //end if	
    }); // end request.execute	
} // end function