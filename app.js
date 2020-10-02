const express = require("express");
const app = express();
const db = process.env.MONGO_URI || require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
var cors = require('cors');
const path = require('path');


const users = require("./routes/api/users");





mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));



app.get("/", (req, res) => res.send("word Up!"));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);







app.use(express.static(__dirname + '/public'));
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));