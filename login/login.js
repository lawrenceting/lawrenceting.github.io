//global function / runs first
(function(){
    var OAUTH_CLIENT_ID = '608400308219-4fvrerlhle0sssa2is8qi8ogvu9ibma9.apps.googleusercontent.com';
    var OAUTH_SCOPES = ['http://www.googleapis.com/auth/yt-analytics.readonly',
                        'http://www.googleapis.com/auth/youtube.readonly',
                        'http://www.googleapis.com/auth/yt-analytics-monetary.readonly',];

    var channelID;

    window.onClientLoad = function(){
        gapi.auth.init(function(){
            window.setTimeout(checkAuth, 1);
        });
    };

    function checkAuth(){
        gapi.auth.authorize(
            {
                client_id : OAUTH_CLIENT_ID,
                scope : OAUTH_SCOPES,
                immediate : true
            },
            handleAuthResult
        );
    }

    function handleAuthResult(authResult){
        if(authResult){
            $('.pre-auth').hide();
            $('post-auth').show();
        }
        else{
            $('.pre-auth').show();
            $('post-auth').hide();
            $('#login-link').click(function(){
                gapi.auth.authorize(
                    {
                        client_id : OAUTH_CLIENT_ID,
                        scope : OAUTH_SCOPES,
                        immediate : false
                    },
                    handleAuthResult
                );
            });
        }
    }

    function loadAPI(){
        gapi.client.load('youtube', 'v3', function(){
            gapi.client.load('youtubeAnalytics', 'v1', function(){
                getUserChannel();
            });
        });
    }

    function getUserChannel(){
        var request = gapi.client.youtube.channels.list({
            mine: true,
            part: 'id, contentDetails'
        });
        request.execute(function(response){
            if('error' in response){
                displayMessage(response.error.message);
            }
            else{
                channelID = response.item[0].id;
                displayChannelID(channelID);
            }
        });
    }

    function displaychannelID(channel){
        alert(channel);
    }


    document.write("xxx");
})();