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
            song = $(response).find( "url" );
            $( "#song_player" ).append( song.text() );
            console.log(song.text());
            song_player_media(song.text())
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
            title = $(response).find( "song title" );
			if (title.text() == "") {
                $( "#song_title" ).append("Ingen låt spelas just nu");
				$( "#song_artist" ).append("");
				$( "#song_album" ).append("");
                spotify_song("eminem");//provisoriskt ifall ingen låt spelas
			}
			else {
                $( "#song_title" ).append( title.text() );
				artist = $(response).find( "song artist" );
				$( "#song_artist" ).append( artist.text() );
				album = $(response).find( "song albumname" );
				$( "#song_album" ).append( album.text() );
                spotify_song(title.text());
			}

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
            value = response.tracks.items[0].external_urls.spotify;
            console.log(value)
               }
        }); 
    };

function song_player_media(song){
          $("#song_player").jPlayer({
           ready: function () {
            $(this).jPlayer("setMedia", {
             m4a: song,
             oga: "/media/mysound.ogg"
            });
           },
           swfPath: "/js",
           supplied: "m4a, oga"
          });
};



sr_songs()
sr_audio_song()