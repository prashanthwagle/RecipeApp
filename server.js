const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const recipes = require("./routes/api/recipes");
const aws = require("./routes/api/aws");

//Instantiate express
const app = express();

//Middlewares
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());

app.use(passport.initialize());

app.use(express.static("client/src"));

require("./config/passport")(passport);

//Database connection
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => console.log(err));

//Routes

app.use("/api/users", users);

app.use("/api/recipes", recipes);

app.use("/api/aws", aws);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on Port ${PORT}`));
