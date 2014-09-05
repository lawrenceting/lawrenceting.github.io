//-----------------------------------
// Global Variables
//-----------------------------------

// Enter a client ID for a web application from the Google Developer Console.
// The provided clientId will only work if the sample is run directly from
// https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
// In your Developer Console project, add a JavaScript origin that corresponds to the domain
// where you will be running the script.
var clientId = '608400308219-pg0s4dr13ucs34ab2tn31rrr34loc1fs.apps.googleusercontent.com';

// Enter the API key from the Google Develoepr Console - to handle any unauthenticated
// requests in the code.
// The provided key works for this sample only when run from
// https://google-api-javascript-client.googlecode.com/hg/samples/authSample.html
// To use in your own application, replace this API key with your own.
var apiKey = 'AIzaSyCMTK34CqbHBt_bjaWXAy4V_n4yBOByepg';

// To enter one or more authentication scopes, refer to the documentation for the API.
var scopes = [
  'https://www.googleapis.com/auth/yt-analytics.readonly',
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/plus.me'
];

  var ONE_MONTH_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 30;

  // Keeps track of the currently authenticated user's YouTube user ID.
  var channelId; //referring to my channel

  // For information about the Google Chart Tools API, see
  // https://developers.google.com/chart/interactive/docs/quick_start
