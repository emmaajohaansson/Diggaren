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
