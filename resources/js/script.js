function sr_p3() {
	//Hämtar en XML-fil från Sveriges radios API innehållande spelaren för Sveriges radio (P3) och en P3-bild. Kallar sedan på funktionen sr_radio_player och skickar med radiospelarens URL.
    $.ajax({
        type: "GET",
        url: "http://api.sr.se/api/v2/channels/164",
        dataType: "xml",
        error: function (response) {
            alert('Error: There was a problem processing your request, please refresh the browser and try again');
        },
        success: function (response) {
            find_picture = $(response).find("image");
			console.log(find_picture.text());
			sr_picture = document.createElement("img");
			sr_picture.setAttribute("src", find_picture.text());
			$("#sr_picture").append(sr_picture);
            radio_url = $(response).find("url");
            sr_radio_player(radio_url.text());
        }
    });
};

function sr_radio_player(radio_url) {
	//Skapar en <audio>-tagg i HTML och lägger in radiospelaren där
    radio_player = "<audio controls=controls><source src=" + radio_url + " type=audio/ogg /><source src=" + radio_url + " type=audio/mpeg /></audio>";
    $("#radio_player").append(radio_player);
};

function sr_current_songs() {
	//Hämtar nuvarande, föregående och nästkommande låttitel och artist från Spotifys API och skriver ut nuvarande låttitel och artist. Kallar sedan på spotify_current_song och skickar med låttitel och artist.
    $.ajax({
        type: "GET",
        url: "http://api.sr.se/api/v2/playlists/rightnow?channelid=164",
        dataType: "xml",
        error: function (response) {
            alert('Error: There was a problem processing your request, please refresh the browser and try again');
        },
        success: function (response) {
            title = $(response).find("song title");
            if (title.text() == "") {
                $("#song_title").append("Ingen låt spelas just nu");
                $("#song_artist").append("");
            } else {
                $("#song_title").append(title.text());
                artist = $(response).find("song artist");
                $("#song_artist").append(artist.text());
                spotify_current_song(title.text(), artist.text());
            }

        }
    });
};

function spotify_current_song(title, artist) {
	//Utifrån låttitel och artist för nuvarande låt som hämtades i sr_current_song hämtas samma låt från Spotifys API. Skapar en <iframe>-tagg i HTML som fungerar som Spotify-spelare som kan spela upp den nuvarande låten (utseende på iframen är förutbestämt enligt Spotifys standarder.)
    $.ajax({
        type: "GET",
        url: "https://api.spotify.com/v1/search?q=track:" + title + "%20artist:" + artist + "&type=track,artist,album&market=SE&limit=1",
        dataType: "json",
        error: function (response) {
            alert('Error: There was a problem processing your request, please refresh the browser and try again');
        },
        success: function (response) {
            spotify_song_uri = response.tracks.items[0].uri;
            spotify_song_embed = "https://embed.spotify.com/?uri=" + spotify_song_uri;
            iframe = document.createElement("iframe");
            iframe.frameBorder=0;
            iframe.width="300px";
            iframe.height="80px";
            iframe.setAttribute("src", spotify_song_embed);
            document.getElementById("spotify_current_song").appendChild(iframe);
        }
    });
};
function sr_previous_songs() {

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
            var i;
            var list= "";
            var x = response.getElementsByTagName("song");
            for (i = 0; i <x.length; i++){
                list = "";
                previous_title = x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
                start_time_song = x[i].getElementsByTagName("starttimeutc")[0].childNodes[0].nodeValue;
                previous_artist = x[i].getElementsByTagName("artist")[0].childNodes[0].nodeValue;
                start_time_song_hour = start_time_song.substring(11, 13);
                start_time_song_hour =+ start_time_song_hour + 2;
                start_time_song_minute = start_time_song.substring(13, 16);
                start_time_song_hour += start_time_song_minute;
                previous_title_id = previous_title.split(" ").join("+");
                previous_artist_id = previous_artist.split(" ").join("+");
                previous_title_artist_id = previous_title_id + "¤" + previous_artist_id;
                list += "<li onclick=spotify_previous_song_player(this.id) id=&quot;" + previous_title_artist_id + "&quot;>" + start_time_song_hour + " - &quot;" + previous_title + "&quot; av " + previous_artist + "</li>";
                $("#previous_songs_title").append(list);
            }
        }
    });
};

function spotify_previous_song_player(title) {
    previous_title = title.split("+").join(" ");
    previous_title_artist_id = title.split("¤").join(" ");
    console.log(title)
    console.log(previous_title_artist_id)
    $.ajax({
        type: "GET",
        url: "https://api.spotify.com/v1/search?q=" + previous_title + "&type=track,artist,album&market=SE&limit=1",
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
            document.getElementById(title).appendChild(iframe);
        }
    });
};

sr_p3()
sr_previous_songs()