$(document).ready(function() {
    // Getting jQuery references to the question body, title and  form
    var bodyInput = $("#body");
    var titleInput = $("#title");
    var QForm = $("#qForm");
    
    // Adding an event listener for when the form is submitted
    $(QForm).on("submit", handleFormSubmit);
    function handleFormSubmit(event) {
        event.preventDefault();
        // Wont submit the post if we are missing a body and  title
        if (!titleInput.val().trim() || !bodyInput.val().trim()) {
          return;
        }
        // Constructing a newPost object to hand to the database
        var newPost = {
          title: titleInput
            .val()
            .trim(),
          body: bodyInput
            .val()
            .trim()
        };
    }
    


});