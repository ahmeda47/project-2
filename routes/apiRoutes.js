var db = require("../models");

module.exports = function(app) {
  //   app.get("/", function(req, res) {
  //     // 1. Add a join to include all of each Author's Posts

  //       res.sendFile("index.html");
  //     });

  app.get("/api/login", function(req, res) {
    //res.json
  });
  app.get("/api/signup", function(req, res) {
    res.sendFile("../public/signup.html");
  });

  // app.post("/api/signup", function(req, res) {
  //   db.Users.create(req.body).then(function(dbUsers) {
  //     res.json(dbUsers);
  //   });

  // });
};
