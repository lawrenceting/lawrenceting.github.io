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
    }, handleAuthResult
  );
}

//------------------------------------------------------
// Check login / logout
//------------------------------------------------------
function handleAuthResult(authResult) {
  var authorizeButton = document.getElementById('authorize-button');

  if (authResult && !authResult.error) {
    authorizeButton.style.visibility = 'hidden';

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
    }, handleAuthResult
  );
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