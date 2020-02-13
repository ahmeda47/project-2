$("#login").on("submit", function() {
  event.preventDefault();
  $.ajax({
    url: "api/login",
    method: "POST"
  });

  console.log(
    $("#inputEmail")
      .val()
      .trim()
  );
  console.log(
    $("#inputPassword")
      .val()
      .trim()
  );
});
