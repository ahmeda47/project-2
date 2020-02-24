$(document).ready(function() {
  // Getting jQuery references to the question  body, title, form 
  var bodyInput = $("#body");
  var titleInput = $("#title");
  var qForm = $("#qForm");
  

  $(qForm).on("submit", handleFormSubmit);
  
  
  // A function for handling what happens when the form to create a new question is submitted
  function handleFormSubmit(event) {
      event.preventDefault();
    // Wont submit the question if we are missing a body, title, or author
    if (!titleInput.val().trim() || !bodyInput.val().trim()) {
      return;
    }
    // Constructing a newQuestion object to hand to the database
    var newQuestion = {
      title: titleInput
        .val()
        .trim(),
      body: bodyInput
        .val()
        .trim(),
   
    };
      submitQuestion(newQuestion);

  }

  // Submits a new Question and brings user to build question page upon completion
  function submitQuestion(newQuestion) {
    $.post("/buildquestion", newQuestion, function() {
      window.location.href = "/buildquestion";
    });
  }
});
  