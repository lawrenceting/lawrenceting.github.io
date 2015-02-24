// Global Variables
//------------------------------------------------------------------------------
var maxResults = new Object();
var thumbnailWidth;

$( window ).load(function(e) { 
	
// Maximum videos to display in a channel / playlist
//------------------------------------------------------------------------------
	var temp_div = document.createElement("div"); //create temporary div
	document.body.appendChild(temp_div); //append div to body
	
	temp_div.className = "thumbnailContainer"; //give div a class
	thumbnailWidth = parseInt($(".thumbnailContainer").css("width"), 10); //get thumbnail width
	
    maxResults.videos = Math.ceil(screen.width/thumbnailWidth); //screen width ÷ thumbnail width
	if (maxResults.videos > 50) { maxResults.videos = 50 } //if maxResults > 50

// Maximum number of channel / playlist to display
//------------------------------------------------------------------------------		
	temp_div.className = "channelThumbnail"; //give div a class
	var thumbnailHeight = parseInt($(".channelThumbnail").css("height"), 10); //get thumbnail width
	
    maxResults.channels = Math.ceil(screen.height/thumbnailHeight); //screen height ÷ thumbnail height
	if (maxResults.channels > 50) { maxResults.channels = 50 } //if maxResults > 50
	
	temp_div.remove();	
	
	
});