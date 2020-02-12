$("#login").on("click", function() {
  event.preventDefault();
  $.ajax({
    url: "api/login",
    method: "POST"
  });
});
