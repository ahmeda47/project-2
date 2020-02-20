var db = require("../models");

module.exports = function(app) {
//Root Route
  app.get("/", function(req, res) {
      res.sendFile("index.html");
    });
  
// API Route for login 
  app.get("/api/login", function(req, res) {
    res.sendFile("login.html");
      dbUsers.findOne({
        where:{
          userName:req.body.userName
        }
      })
    });

  // API Route for Signup
  app.get("/api/signup", function(req,res){
    res.sendFile("../public/signup.html");
  });

  //Post User data to database
  app.post("/api/signup", function(req, res) {
    db.Users.create(req.body).then(function(dbUsers) {
      res.json(dbUsers);
    });

  });
  //API Route for ask question
  app.get("/api/buildQuestion",function(req,res){
    res.sendFile("../public/buildQuestion.html");
  });
  // Api Route to post question data into database
  app.post("/api/buildQuestion",function(req,res){
    // db.Question.create(req.body.Title, req.body.body).then(function(dbQuestion){
    //   res.json(dbQuestion);
    // });

    console.log('hello')
  })
}