const express = require("express");
const app = express();

let PORT = 8080;

//app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const routes = require("./controllers/controllers.js");

app.use(routes);

app.listen(PORT, err => {
  if (err) throw err;
  console.log(`connected to port http://localhost:${PORT}`);
});
