function sr_audio_song() {
	//Hämtar en XML-fil från Sveriges radios API innehållande spelaren för Sveriges radio (P3) och en P3-bild. Kallar sedan på funktionen sr_radio_player och skickar med radiospelarens URL.
    $.ajax({
        type: "GET",
        url: "http://api.sr.se/api/v2/channels/164",
        dataType: "xml",
        error: function (response) {
            alert('Error: There was a problem processing your request, please refresh the browser and try again');
        },
        success: function (response) {
            console.log(response);
            find_picture = $(response).find("image");
			console.log(find_picture.text());
			sr_picture = document.createElement("img");
			sr_picture.setAttribute("src", find_picture.text());
			$("#sr_picture").append(sr_picture);
            song = $(response).find("url");
            console.log(song.text());
            song_player_media(song.text())
        }
    });
};

function song_player_media(song) {
	//Skapar en <audio>-tagg i HTML och lägger in radiospelaren där
    radio_player = "<audio controls=controls><source src=" + song + " type=audio/ogg /><source src=" + song + " type=audio/mpeg /></audio>";
    $("#radio_player").append(radio_player);
};

function sr_songs() {
	//Hämtar nuvarande, föregående och nästkommande låttitel och artist från Spotifys API och skriver ut nuvarande låttitel och artist. Kallar sedan på spotify_current_song och skickar med låttitel och artist.
    $.ajax({
        type: "GET",
        url: "http://api.sr.se/api/v2/playlists/rightnow?channelid=164",
        dataType: "xml",
        error: function (response) {
            alert('Error: There was a problem processing your request, please refresh the browser and try again');
        },
        success: function (response) {
            console.log(response);
            title = $(response).find("song title");
            if (title.text() == "") {
                $("#song_title").append("Ingen låt spelas just nu");
                $("#song_artist").append("");
            } else {
                $("#song_title").append(title.text());
                artist = $(response).find("song artist");
                $("#song_artist").append(artist.text());
                spotify_song(title.text(), artist.text());
                console.log(title.text() + " " + artist.text());
            }
        }
    });
};

function spotify_song(title, artist) {
	//Utifrån låttitel och artist för nuvarande låt som hämtades i sr_current_song hämtas samma låt från Spotifys API. Skapar en <iframe>-tagg i HTML som fungerar som Spotify-spelare som kan spela upp den nuvarande låten (utseende på iframen är förutbestämt enligt Spotifys standarder.)
    $.ajax({
        type: "GET",
        url: "https://api.spotify.com/v1/search?q=track:" + title + "%20artist:" + artist + "&type=track,artist,album&market=SE&limit=1",
        dataType: "json",
        error: function (response) {
            alert('Error: There was a problem processing your request, please refresh the browser and try again');
        },
        success: function (response) {
            console.log(response);
            spotify_song_url = response.tracks.items[0].external_urls.spotify;
            spotify_song_uri = response.tracks.items[0].uri;
            spotify_song_uri_new = "https://embed.spotify.com/?uri=" + spotify_song_uri;
            iframe = document.createElement("iframe");
            iframe.frameBorder=0;
            iframe.width="300px";
            iframe.height="80px";
            iframe.setAttribute("src", spotify_song_uri_new);
            document.getElementById("spotify_current_song").appendChild(iframe);
        }
    });
};

function sr_audio_old_songs() {
	//Ej klar kommentar
	//Hämtar de 20 senast spelade låtarna på P3 från Sveriges radios API. 
    $.ajax({
        type: "GET",
        url: "http://api.sr.se/api/v2/playlists/getplaylistbychannelid?id=164&size=20",
        dataType: "xml",
        error: function (response) {
            alert('Error: There was a problem processing your request, please refresh the browser and try again');
        },
        success: function (response) {
            console.log(response);
            var i;
            var list= "";
            var x = response.getElementsByTagName("song");
            for (i = 0; i <x.length; i++){
                list = "";
                song_name = x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
                start_time_song = x[i].getElementsByTagName("starttimeutc")[0].childNodes[0].nodeValue;
                artist_song = x[i].getElementsByTagName("artist")[0].childNodes[0].nodeValue;
                start_time_song_correction = start_time_song.substring(11, 13);
                start_time_song_correction =+ start_time_song_correction + 2;
                start_time_song_new = start_time_song.substring(13, 16);
                start_time_song_correction += start_time_song_new;
                song_name_new = song_name.split(" ").join("+");
                list += "<li onclick=spotify_old_song(this.id) id=&quot;" + song_name_new + "&quot;>" + start_time_song_correction + " - &quot;" + song_name + "&quot; av " + artist_song + "</li>";
                $("#old_songs_title").append(list);
                song_name_new = song_name.split("+").join(" ");
                console.log(list);
                spotify_song_url_append(song_name, artist_song);
                function spotify_song_url_append_callback(results){
                       console.log(results);
                };  
                console.log(test_return);
            }
            console.log(list);
        }
    });
};

function spotify_old_song(song_name) {
    song_name_new = song_name.split("+").join(" ");
    spotify_song_url_append(song_name_new);
};

function spotify_song_url_append(title, artist) {
    $.ajax({
        type: "GET",
        url: "https://api.spotify.com/v1/search?q=track:" + title + "%20artist:" + artist + "&type=track,artist,album&market=SE&limit=1",
        dataType: "json",
        error: function (response) {
            alert('Error: There was a problem processing your request, please refresh the browser and try again');
        },
        success: function (response) {
            spotify_song_url = response.tracks.items[0].uri;
            spotify_old_song_url = "https://embed.spotify.com/?uri=" + spotify_song_url;
            iframe = document.createElement("iframe");
            iframe.frameBorder=0;
            iframe.width="300px";
            iframe.height="80px";
            iframe.setAttribute("src", spotify_old_song_url);
            document.getElementById("old_songs_title").appendChild(iframe);
            spotify_song_url_append_callback(iframe);
        }
    });
};

sr_songs()
sr_audio_song()
sr_audio_old_songs()