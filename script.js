function sr_audio_song(){
        $.ajax({
                type: "GET",               
               url: "http://api.sr.se/api/v2/channels/164",               
                dataType: "xml",
               error: function (response) {           
                        alert('Error: There was a problem processing your request, please refresh the browser and try again');
                },
                success: function (response) {
            console.log(response);
                    $song = $(response).find( "url" );
                    $( "#song_player" ).append( $song.text() );
               }
        });
    };

    function sr_songs(){
        $.ajax({
                type: "GET",               
               url: "http://api.sr.se/api/v2/playlists/rightnow?channelid=164",               
                dataType: "xml",
               error: function (response) {           
                        alert('Error: There was a problem processing your request, please refresh the browser and try again');
                },
                success: function (response) {
            console.log(response);
                title = $(response).find( "title" );
            $( "#song_title" ).append( title.text() );
                artist = $(response).find( "artist" );
            $( "#song_artist" ).append( artist.text() );
               }
        });
    };

    function spotify_song(title){
        $.ajax({
                type: "GET",               
               url: "https://api.spotify.com/v1/search?q="+title+"&type=track,artist,album&market=SE&limit=1",
                dataType: "json",
               error: function (response) {           
                        alert('Error: There was a problem processing your request, please refresh the browser and try again');
                },
                success: function (response) {
            console.log(response);
               }
        }); 
    };

sr_songs()
sr_audio_song()
spotify_song(eminem)