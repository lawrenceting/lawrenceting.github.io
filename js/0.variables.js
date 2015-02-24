// Global Variables
//------------------------------------------------------------------------------

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
var scopes = [	'https://www.googleapis.com/auth/yt-analytics.readonly',
				'https://www.googleapis.com/auth/youtube.readonly',
				'https://www.googleapis.com/auth/plus.me',
			  	'https://www.googleapis.com/auth/plus.login'
			];

// Keeps track of the currently authenticated user's related playlists
var myChannel = new Object();

var WH_List = [];
var savedPlaylists = [
						"PLrEnWoR732-BHrPp_Pm8_VleD68f9s14-",
						"PLrEnWoR732-DZV1Jc8bUpVTF_HTPbywpE",
						"PLrEnWoR732-D6uerjQ8dZiyy9bJID58CK",
						"PLN_VEYjh8gCByLq9iBB_yP4Qyhh95DMyH",
						"UUVgO39Bk5sMo66-6o6Spn6Q", 
						"UUDsi1i0ShhKDrWP0VOm7Z_w", 
						"UUi7GJNg51C3jgmYTUwqoUXA", 
						"UU1yBKRuGpC1tSM73A0ZjYjQ", 
						"UUvy9bjqfawiaE_CklFSdnzg", 
						"UUX6b17PVsYBQ0ip5gyeme-Q",
						"UUNye-wNBqNL5ZzHSJj3l8Bg", 
						"UUotwjyJnb-4KW7bmsOoLfkg", 
						"UU16niRr50-MSBwiO3YDb3RA", 
						"UUvQECJukTDE2i6aCoMnS-Vg", 
						"UUUMZ7gohGI9HcU9VNsr2FJQ", 
						"UUcyq283he07B7_KUX07mmtA", 
						"UUOmcA3f_RrH6b9NmcNa4tdg", 
						"UUe-4xQosMQGkIA8mT4sR98Q", 
						"UUdOm7WpPkqW6FPh23JA2mag", 
						"UUoUxsWakJucWg46KW5RsvPw", 
						"UUa6vGFO9ty8v5KZJXQxdhaw", 
						"UU4a-Gbdw7vOaccHmFo40b9g", 
						"UU3XTzVzaHQEd30rQbuvCtTQ", 
						"UUL8Nxsa1LB9DrMTHtt3IKiw", 
						"UUeiYXex_fwgYDonaTcSIk6w", 
						"UUUHW94eEFW7hkUMVaZz4eDg", 
						"UUB6PV0cvJpzlcXRG7nz6PpQ", 
						"UUaLfMkkHhSA_LaCta0BzyhQ", 
						"UUdJ9oJ2GUF8Vmb-G63ldGWg", 
						"UUAuUUnT6oDeKwE6v1NGQxug", 
						"UUsooa4yRKGN_zEE8iknghZA", 
						"UUgRvm1yLFoaQKhmaTqXk9SA", 
						"UU_NaA2HkWDT6dliWVcvnkuQ", 
						"UUHpw8xwDNhU9gdohEcJu4aA", 
						"UUqnbDFdCpuN8CMEg0VuEBqA", 
						"UUddiUEpeqJcYeBxX1IVBKvQ", 
						"UU8Su5vZCXWRag13H53zWVwA", 
						"UUHnyfMqiRRG1u-2MsSQLbXA", 
						"UUn8zNIfYAQNdrFRrr8oibKw", 
						"UUZaT_X_mc0BI-djXOlfhqWQ", 
						"UU6nSFpj9HTCZ5t-N3Rm3-HA", 
						"UUqmugCqELzhIMNYnsjScXXw", 
						"UUwmFOfFuvRPI112vR5DNnrA", 
						"UUK7tptUDHh-RYDsdxO1-5QQ", 
						"UUwTcFaOYFjIbxHjrmP0ptxw"
					 ];

var DB = new Object(); //database

var div_in_viewport = [];