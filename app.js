//1.引入 package
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const passport = require("passport");

const mongoose = require("mongoose");
const bdParser = require("body-parser");
const methodOverride = require("method-override");
const flash = require("connect-flash");

//2.設定 package

//express
const app = express();
app.listen(process.env.PORT || 3000, () => {
  console.log("server connsected ");
});

//express-session
app.use(session({ secret: "okok" }));

//express-handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//mongoose
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1/accountrecord",
  { useNewUrlParser: true, useCreateIndex: true }
);
const db = mongoose.connection;
db.on("error", () => {
  console.log("mongodb error");
});
db.once("open", () => {
  console.log(" mongodb connected ");
});

//passport
app.use(passport.initialize());
app.use(passport.session());
//require('')

//body-parser
app.use(bdParser.urlencoded({ extended: true }));

//method-overrride
app.use(methodOverride("_method"));

//connect-flash
app.use(flash());

//3.route
