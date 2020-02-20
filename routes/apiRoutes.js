var db = require("../models");
const passport = require("passport");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const path = require("path");
require("dotenv").config();

// module.exports = function(app) {
//   //Root Route
//   app.get("/", function(req, res) {
//     res.sendFile("index.html");
//   });

//   // API Route for login
//   app.get("/api/login", function(req, res) {
//     res.sendFile("login.html");
//     dbUsers.findOne({
//       where: {
//         userName: req.body.userName
//       }
//     });
//   });

//   // API Route for Signup
//   app.get("/api/signup", function(req, res) {
//     res.sendFile("../public/signup.html");
//   });

//   //Post User data to database
//   app.post("/api/signup", function(req, res) {
//     db.Users.create(req.body).then(function(dbUsers) {
//       res.json(dbUsers);
//     });
//   });
//   //API Route for ask question
//   app.get("/api/ask-question", function(req, res) {
//     res.sendFile("../public/buildQuestion.html");
//   });
//   // Api Route to post question data into database
//   app.post("/api/ask-question", function(req, res) {
//     db.Question.create(req.body.Title, req.body.Body).then(function(
//       dbQuestion
//     ) {
//       res.json(dbQuestion);
//     });
//   });
// };
// app.get("/api/login", function(req, res) {
//   db.User.findAll({}).then(function(dbUsers) {
//     res.json(dbUsers);
//   });
// });

//mine

module.exports = function(app) {
  app.get("/api/signup", function(req, res) {
    db.User.findAll({}).then(function(dbUsers) {
      res.json(dbUsers);
    });
  });

  app.get("/buildquestion", authenticationMiddleware(), function(req, res) {
    res.sendFile(path.join(__dirname, "../public/buildQuestion.html"));
    console.log(req.user);
    console.log(req.isAuthenticated());
  });

  app.post("/signup", function(req, res) {
    console.log(req.body);

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
      db.User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        userName: req.body.userName,
        password: hash
      }).then(function(response) {
        const user_id = response.annotation_id;

        console.log(user_id);
        req.login(user_id, function(err) {
          res.redirect("/buildquestion");
        });
      });
    });
  });

  //authentication request
  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/buildquestion",
      failureRedirect: "/login"
    })
  );

  passport.serializeUser(function(user_id, done) {
    done(null, user_id);
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
=======

  passport.deserializeUser(function(user_id, done) {
    done(null, user_id);
  });
  function authenticationMiddleware() {
    return (req, res, next) => {
      console.log(
        `req.session.passport.user: ${JSON.stringify(req.session.passport)}`
      );

      if (req.isAuthenticated()) return next();
      res.redirect("/login");
    };
  }
};
