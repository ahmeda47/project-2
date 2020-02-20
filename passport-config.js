// function intitialize(passport) {
//   const authenticateUser = (email, password, done) => {
//     const user = getUserByEmail(email);
//     if (user == null) {
//       return done(null, false, { message: "no user with that email" });
//     }
//     //if matches
//   };

//   passport.use(new LocalStrategy({ usernameField: "email" }), authenticateUser);

//   passport.serializeUser((user, done) => {});
//   passport.deserializeUser((id, done) => {});
// }
// const LocalStrategy = require("passport-local").Strategy;

// passport.use(
//   new LocalStrategy(function(username, password, done) {
//     User.findOne({ username: username }, function(err, user) {
//       if (err) {
//         return done(err);
//       }
//       if (!user) {
//         return done(null, false);
//       }
//       if (!user.verifyPassword(password)) {
//         return done(null, false);
//       }
//       return done(null, user);
//     });
//   })
// );

// module.exports = initialize;

//initialize

//authenticateUser

//passport middleware
