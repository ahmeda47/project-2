var db = require("../models");
const path= require('path');

module.exports = function(app) {
  app.get("/", function(req, res) {
    // 1. Add a join to include all of each Author's Posts
    
      res.sendFile(path.join(__dirname, "../public/home.html"));
    });
  

  app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
    
  });
  app.get("/signup", function(req,res){
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });
  app.get("/buildQuestion", function(req,res){
    res.sendFile(path.join(__dirname, "../public/buildQuestion.html"));
  });
  // app.post("/buildQuestion",function(req,res){
  //    const newQuestion = {
  //      Title:res.body.Title,
  //      Body: res.body.Body
  //    } 
  //   console.log(newQuestion);
  // });


  
}