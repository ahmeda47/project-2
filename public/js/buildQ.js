// $(document).ready(function() {
//     // Getting jQuery references to the question body, title and  form
var codeInput = $("#code");
var titleInput = $("#title");
// var QForm = $("#qForm");
// var submit = $('#btn-submit');
$('#btn-submit').on('click', function(event){
event.preventDefault();
console.log('hello')

// var obj = {title:titleInput.value, body: codeInput.value }
// $.ajax({
//   type: 'POST',
//   URL: '/api/buildQuestion',
//   data: obj
// })
var newQuestion = {
         title: titleInput.val().trim(),
        body: codeInput.val().trim()
      };
   
      $.post("/buildQuestion", newQuestion, function() {
       window.location.href = "/buidQuestion";
    });

})
// })
//    function test(){
//       event.preventDefault()
//       alert('you save the data')
//     };

// });
//     submit.on('click',handleFormSubmit);{
//       alert('you submit data');
//     }
//     // Adding an event listener for when the form is submitted
//     // $(QForm).on("submit", handleFormSubmit)
//     // {
//     //   alert('You submit data');
//     // }
//     function handleFormSubmit(event) {
//         event.preventDefault();
//         // Wont submit the post if we are missing a body and  title
//         if (!titleInput.val().trim() || !codeInput.val().trim()) {
//           return;
//         }
//         // Constructing a newPost object to hand to the database
//         var newQuestion = {
//           title: titleInput
//             .val()
//             .trim(),
//           code: codeInput
//             .val()
//             .trim()
//         };
//     }
//         $.post("/api/buildQuestion", newQuestion, function() {
//           window.location.href = "/buidQuestion";
//         });
  
// });
