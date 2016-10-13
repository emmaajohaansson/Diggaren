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

$.ajax({//https://developer.spotify.com/web-api/console/get-search-item/?q=eminem&type=track&market=US#complete
                type: "GET",               
               url: "https://api.spotify.com/v1/search?q=till+i+collapse&type=track&market=SE&limit=1",
                dataType: "json",
               error: function (response) {           
                        alert('Error: There was a problem processing your request, please refresh the browser and try again');
                },
                success: function (response) {
            console.log(response);
               }
        }); 