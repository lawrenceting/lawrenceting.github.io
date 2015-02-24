// Use a button to handle authentication the first time.
function handleClientLoad() {
	gapi.client.setApiKey(apiKey);
	window.setTimeout(checkAuth,1);
}
function checkAuth() {
	gapi.auth.authorize({
		client_id: clientId, 
		scope: scopes, 
		immediate: true
	}, handleAuthResult);
}
//------------------------------------------------------
// Check login / logout
//------------------------------------------------------
function handleAuthResult(authResult) {
	
	if (!authResult.status.signed_in){
//		var $modal = $('#loginModal').modal({
//			  backdrop: true,
//			  show: false,
//			  keyboard: false
//		});
//			$modal.modal('show');	
	}
	
	var authorizeButton = document.getElementById('authorize-button');

	if (authResult && !authResult.error) {
//		authorizeButton.style.visibility = 'hidden';
		$('#authorize-button').hide();

		$('#logout-button').click(disconnectUser);

		makeApiCall();
	} 
	else {
		authorizeButton.style.visibility = '';
		authorizeButton.onclick = handleAuthClick;
	}
}
function handleAuthClick(event) {
	gapi.auth.authorize({
		client_id: clientId, 
		scope: scopes, 
		immediate: false
	}, handleAuthResult);
	
	return false;
}
function disconnectUser() {
	var token = gapi.auth.getToken();
	console.log(token);

	if(token){
		var script = document.createElement("script");
		script.src = 'https://accounts.google.com/o/oauth2/revoke?token=' + token.access_token;
		document.body.appendChild(script);
		document.body.removeChild(script);
	}
	
	gapi.auth.getToken(null);
	handleAuthResult(null);
	location.reload(true); //refresh page

	console.log("Logged out.");
}
//------------------------------------------------------
// Google Plus
//------------------------------------------------------
function googlePlus() {
	var request = gapi.client.plus.people.get({
		'userId': 'me'
	});
	
    request.execute(function(resp) {

		$('#avatar').prepend(
			'<img class="channelThumbnail" src="' + resp.image.url + '">' + 
			'<displayName>' + resp.displayName + '</displayName>'
		);
    });
} //end function