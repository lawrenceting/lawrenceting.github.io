// Your use of the YouTube API must comply with the Terms of Service:
// https://developers.google.com/youtube/terms

// Helper function to display JavaScript value on HTML page.
function showResponse(response) {

    //var responseString = JSON.stringify(response, '', 2);
    //document.getElementById('response').innerHTML += responseString;
    //return 0;

    var video = response.items[2];
    var videoSnippet = video.snippet;

    var responseString = JSON.stringify(videoSnippet.thumbnails.high.url, '', 2);

    document.getElementById('response').innerHTML += "<img src = " + responseString + ">";
        document.getElementById('response').innerHTML += "<br>";
    
    document.getElementById('response').innerHTML += videoSnippet.title;
        document.getElementById('response').innerHTML += "<br>";

    document.getElementById('response').innerHTML += videoSnippet.description;
        document.getElementById('response').innerHTML += "<br>";

    var responseString = video.id.videoId;
    document.getElementById('response').innerHTML += '<iframe width="420" height="315" src="http://www.youtube.com/embed/' + responseString + '"></iframe>';
}

// Called automatically when JavaScript client library is loaded.
function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}

// Called automatically when YouTube API interface is loaded (see line 9).
function onYouTubeApiLoad() {
    // This API key is intended for use only in this lesson.
    // See http://goo.gl/PdPA1 to get a key for your own applications.
    gapi.client.setApiKey('AIzaSyCMTK34CqbHBt_bjaWXAy4V_n4yBOByepg');

    // Add code here to test out showResponse():

    search();
}

function search() {
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q: 'team coco'
    });
    
    // Send the request to the API server,
    // and invoke onSearchRepsonse() with the response.
    request.execute(onSearchResponse);
}

// Called automatically with the response of the YouTube API request.
function onSearchResponse(response) {
    showResponse(response);   
}