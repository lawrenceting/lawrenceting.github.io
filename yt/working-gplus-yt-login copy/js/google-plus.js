//------------------------------------------------------
// Google Plus
//------------------------------------------------------
function googlePlus() {
    var request = gapi.client.plus.people.get({
      'userId': 'me'
    });
    request.execute(function(resp) {
      var heading = document.createElement('h4');
      var image = document.createElement('img');

      //showResponse(resp);

      image.src = resp.image.url;
      heading.appendChild(image);
      heading.appendChild(document.createTextNode(resp.displayName));

      document.getElementById('auth').appendChild(heading);
    });
    //showResponse(request);
}
//