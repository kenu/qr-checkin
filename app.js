require("dotenv").config();
const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");

const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

// const getDataUrl = require("./util/qrcodeUtil");
// const { decrypt } = require("./util/cryptoUtil");
const Attend = require("./store/Attend.js");

const rootRouter = require("./route/rootRouter");
const attendRouter = require("./route/attendRouter");
// const eventRouter = require("./route/event");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env["GOOGLE_CLIENT_ID"],
      clientSecret: process.env["GOOGLE_CLIENT_SECRET"],
      callbackURL: "/return",
      scope: ["email", "profile"],
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log("accessToken", accessToken);
      // In this example, the user's Facebook profile is supplied as the user
      // record.  In a production-quality application, the Facebook profile should
      // be associated with a user record in the application's database, which
      // allows for account linking and authentication with other identity
      // providers.
      return cb(null, profile);
    }
  )
);

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({ resave: false, saveUninitialized: false, secret: "!Seoul" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(passport.initialize());
app.use(passport.session());

app.use("/", rootRouter);
//TODO: /attends로 변경해야함.
app.use("/register", attendRouter);
// app.use("/events", eventsRouter);

/*

app.get("/profile", ensureLoggedIn(), async function (req, res) {
  const url = await getDataUrl(req.user.name);
  res.render("profile", { user: req.user, dataurl: url });
});

app.post("/register", async function (req, res) {
  const data = decrypt(req.body.data);
  if (data) {
    const row = data.split("|");
    console.log(row);
    if (row.length < 2) {
      res.send({ success: false, message: "Login Again!" });
      return;
    }
    const record = {
      event: process.env.EVENT_NAME || "202103os",
      username: row[1],
      created: new Date(Number(row[0])),
    };
    let result = {};
    try {
      result = await Attend.save(record);
    } catch (err) {
      result = { success: false, message: err.message };
    }
    res.end(JSON.stringify(result));
  } else {
    res.send({ success: false, message: "Invalid Data." });
  }
});

*/

app.get("/reader", function (req, res) {
  res.render("reader");
});

// app.get("/Ilist", async function (req, res) {
//   const list = await Attend.findAll();
//   res.render("list", { list });
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
