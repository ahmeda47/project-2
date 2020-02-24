$(document).ready(function() {
    /* global moment */
  
    //questionContainer holds all of our questions
    var questionContainer = $(".question-container");

   $(document).on("click", "button.delete", handleQuestionDelete);
   $(document).on("click", "button.edit", handleQuestionEdit);
    var askQuestion = $('#btn-question');
    $(askQuestion).on('click', getQuestions)
    // Variable to hold our questions
    var questions;
  
    var url = window.location.search;
    var questionId;
    if (url.indexOf("?question_id=") !== -1) {
      questionId = url.split("=")[1];
      getQuestions(questionId);
    }
    // If there's no questionId we just get all questions as usual
    else {
      getQuestions();
    }
  
  
    // This function grabs questions from the database and updates the view
    function getQuestions(question) {
      console.log("get questions");
      questionId = question || "";
      if (questionId) {
        questionId = "/?question_id=" + questionId;
      }
      $.get("/api/getquestions" + questionId).then( function(data) {
        console.log("Questions", data);
        questions = data;
        if (!questions || !questions.length) {
          displayEmpty(question);
        }
        else {
          initializeRows();
        }
      });
    }
  
    //This function does an API call to delete question
    function deleteQuestion(id) {
        $.ajax({
          method: "DELETE",
          url: "/getquestions/" + id
        })
          .then(function() {
            getQuestions();
          });
      }
  
    // InitializeRows handles appending all of our constructed post HTML inside questionContainer
    function initializeRows() {
      questionContainer.empty();
      var questionsToAdd = [];
      for (var i = 0; i < questions.length; i++) {
        questionsToAdd.push(createNewRow(questions[i]));
      }
      questionContainer.append(questionsToAdd);
    }
  
    // This function constructs a question's HTML
    function createNewRow(question) {
      var formattedDate = new Date(question.createdAt);
      formattedDate = moment(formattedDate).format("MM/DD/YYYY, h:mm:ss a");
      var newQCard = $("<div>");
      newQCard.addClass("card");
      var newQCardHeading = $("<div>");
      newQCardHeading.addClass("card-header");
      var deleteBtn = $("<button style=float:right>");
      deleteBtn.text("x");
      deleteBtn.addClass("delete btn btn-danger");
      var editBtn = $("<button style=float:right>");
      editBtn.text("EDIT");
      editBtn.addClass("edit btn btn-info");
      var newQTitle = $("<h2>");
      var newQDate = $("<br/><h6 style=float:right>");
      var newQ = $("<h5>");
    //   newPostAuthor.text("Written by: " + question.Title);
    //   newPostAuthor.css({
    //     float: "right",
    //     color: "blue",
    //     "margin-top":
    //     "-10px"
    //   });
      var newQCardBody = $("<div>");
      newQCardBody.addClass("card-body");
      var newQBody = $("<p>");
      newQTitle.text(question.title + " ");
      newQBody.text(question.body);
      newQDate.text(formattedDate);
      newQTitle.append(newQDate);
      newQCardHeading.append(deleteBtn);
      newQCardHeading.append(editBtn);
      newQCardHeading.append(newQTitle);
      
      newQCardBody.append(newQBody);
      newQCard.append(newQCardHeading);
      newQCard.append(newQCardBody);
      newQCard.data("question", question);
      return newQCard;
    }
  
    //This function figures out which post we want to delete and then calls deleteQuestion
    function handleQuestionDelete() {
      var currentQuestion = $(this)
        .parent()
        .parent()
        .data("question");
      deleteQuestion(currentQuestion.id);
    }
  //This function is used to edit the question
    function handleQuestionEdit() {
      var currentQuestion = $(this)
        .parent()
        .parent()
        .data("question");
      window.location.href = "/buildquestion?question_id=" + currentQuestion.id;
    }
  
    // This function displays a message when there are no posts
    function displayEmpty(id) {
      var query = window.location.search;
      var partial = "";
      if (id) {
        partial = " for Question #" + id;
      }
      questionContainer.empty();
      var messageH2 = $("<h2>");
      messageH2.css({ "text-align": "center", "margin-top": "50px" });
      messageH2.html("No Question yet" + partial + ", navigate <a href='/buildquestion" + query +
      "'>here</a> in order to get started.");
      questionContainer.append(messageH2);
    }
  
  });
  
