$(document).on("click", ".save", function() {
   
//Whenever someone clicks the saved button, the post method is called using ajax sending info to server

    // Grab the link associated with the article from the submit button
    var link = $(this.children).attr("link");
    console.log(link);
    // Run a POST request to save the article link
    $.ajax({
      method: "POST",
      url: "/save",
      data: {
        link
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
      });
  });

  $(document).on("click", "#saved", function() {
    $.ajax({
        url: "/saved",
        type: "GET",
      }).then(
        function() {
         console.log("getting saved articles")
        }
      );  
    });

    $(document).on("click", ".remove", function() {
   
        //Whenever someone clicks the saved button, the post method is called using ajax sending info to server
        
            // Grab the link associated with the article from the submit button
            var link = $(this.children).attr("link");
            console.log(link);
            // Run a POST request to save the article link
            $.ajax({
              method: "POST",
              url: "/remove",
              data: {
                link
              }
            })
              // With that done
              .then(function(data) {
                // Log the response
                console.log(data);
              });
          });
        
    
  // For Sophia to fill out as practice
  // when clicking the saved articles button, should send get request to server and send back data from mongo with saved:true filtered to render display
  $(document).on("click", ".savedArt", function() {
    // Run a GET request with ajax to retrieve the saved articles
    // Render saved articles on the DOM
  });

