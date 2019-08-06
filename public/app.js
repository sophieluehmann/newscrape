$(document).on("click", "#scrape", function() {
  alert("Articles Scraped.");
})

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
    
      .then(function(data) {
    
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
              location.reload();
          });

  $(document).on("click", ".note", function() {
    
    var id = $(this.children).attr("id");
    console.log(id);
    $.ajax({
      method: "GET",
      url: "/savedNotes",
      data: {_id: id}
    }).then(function(data) {
      console.log(data);
    })
  })
        
    
  
  $(document).on("click", ".saveNote", function() {
   
    var newNote = {
    text: $('.form-control').val().trim(),
    article: $(this).attr("id")
    }
    

    $.ajax({
      method: "POST",
      url: "/note",
      data: newNote
    })
      .then(function(data) {
        // Log the response
        console.log(data);
       
      });   

      alert("Note Saved");
  })
        
  