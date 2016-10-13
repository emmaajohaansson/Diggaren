    $.ajax({
                type: "GET",               
               url: "http://api.sr.se/api/v2/channels/164",               
                dataType: "xml",
               error: function (response) {           
                        alert('Error: There was a problem processing your request, please refresh the browser and try again');
                },
                success: function (response) {
            console.log(response);
               }
        });

    $.ajax({
                type: "GET",               
               url: "http://api.sr.se/api/v2/playlists/rightnow?channelid=164",               
                dataType: "xml",
               error: function (response) {           
                        alert('Error: There was a problem processing your request, please refresh the browser and try again');
                },
                success: function (response) {
            console.log(response);
                window.$title = $(response).find( "title" );
            $( "#song_title" ).append( $title.text() );
                $artist = $(response).find( "artist" );
            $( "#song_artist" ).append( $artist.text() );
            url_song = "https://api.spotify.com/v1/search?q=" + $title.text() + "&type=track,artist,album&market=SE&limit=1";
            window['url_song'] = url_song;
            console.log(url_song);
               }
        });

    $.ajax({
                type: "GET",               
               url: url_song,
                dataType: "json",
               error: function (response) {           
                        alert('Error: There was a problem processing your request, please refresh the browser and try again');
                },
                success: function (response) {
            console.log(response);
            console.log($url_song);
               }
        }); 