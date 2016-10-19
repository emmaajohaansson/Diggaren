function sr_audio_song() {
    $.ajax({
        type: "GET",
        url: "http://api.sr.se/api/v2/channels/164",
        dataType: "xml",
        error: function (response) {
            alert('Error: There was a problem processing your request, please refresh the browser and try again');
        },
        success: function (response) {
            console.log(response);
            song = $(response).find("url");
            console.log(song.text());
            song_player_media(song.text())
        }
    });
};

function song_player_media(song) {
    radio_player = "<audio controls=controls><source src=" + song + " type=audio/ogg /><source src=" + song + " type=audio/mpeg /></audio>";
    $("#radio_player").append(radio_player);
};

function sr_songs() {
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
                $("#song_album").append("");
            } else {
                $("#song_title").append(title.text());
                artist = $(response).find("song artist");
                $("#song_artist").append(artist.text());
                album = $(response).find("song albumname");
                $("#song_album").append(album.text());
                spotify_song(title.text());
            }

        }
    });
};

function spotify_song(title) {
    $.ajax({
        type: "GET",
        url: "https://api.spotify.com/v1/search?q=" + title + "&type=track,artist,album&market=SE&limit=1",
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
                song_name = x[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
                start_time_song = x[i].getElementsByTagName("starttimeutc")[0].childNodes[0].nodeValue;
                artist_song = x[i].getElementsByTagName("artist")[0].childNodes[0].nodeValue;
                start_time_song_new = start_time_song.substring(11, 16);
                song_name_new = song_name.split(" ").join("+");
                list += "<li onclick=spotify_old_song(this.id) id=" + song_name_new + "&quot;>" + start_time_song_new + " - &quot;" + song_name + "&quot; av " + artist_song + "</li>";
            }
            document.getElementById("old_songs_title").innerHTML = list;
        }
    });
};

function spotify_old_song(song_name) {
    song_name_new = song_name.split("+").join(" ");
    spotify_song_url_append(song_name_new);
}

function spotify_song_url_append(title) {
    $.ajax({
        type: "GET",
        url: "https://api.spotify.com/v1/search?q=" + title + "&type=track,artist,album&market=SE&limit=1",
        dataType: "json",
        error: function (response) {
            alert('Error: There was a problem processing your request, please refresh the browser and try again');
        },
        success: function (response) {
            spotify_song_url = response.tracks.items[0].uri;
            console.log(spotify_song_url);
            spotify_old_song_url = "https://embed.spotify.com/?uri=" + spotify_song_url;
            title_new = title.split(" ").join("+");
            console.log(spotify_old_song_url);
            iframe = document.createElement("iframe");
            iframe.frameBorder=0;
            iframe.width="300px";
            iframe.height="80px";
            iframe.setAttribute("src", spotify_old_song_url);
            document.getElementById(title_new).appendChild(iframe);
        }
    });
};

function spotify_user_profile() {
    $.ajax({
        type: "GET",
        url: "https://api.spotify.com/v1/me",
        dataType: "json",
        error: function (response) {
            alert('Error: There was a problem processing your request, please refresh the browser and try again');
        },
        success: function (response) {
            console.log(response);
        }
    });
};

function spotify_create_playlist() {
    $.ajax({
        type: "GET",
        url: "https://api.spotify.com /v1/users/{user_id}/playlists",
        dataType: "xml",
        error: function (response) {
            alert('Error: There was a problem processing your request, please refresh the browser and try again');
        },
        success: function (response) {
            console.log(response);
            song = $(response).find("url");
            $("#song_player").append(song.text());
            console.log(song.text());
            song_player_media(song.text())
        }
    });
};

sr_songs()
sr_audio_song()
sr_audio_old_songs()
spotify_user_profile()