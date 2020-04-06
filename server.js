const express = require("express");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const session =  require("express-session");
require("./config/database");

const server = express();

require("./config/passport")(passport);

// Database connection



server.set("view engine","handlebars");
server.engine( "handlebars", exphbs({defaultLayout: "main"}) );

server.use(express.static(path.join(__dirname,"public")))


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

server.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
server.use(passport.initialize());
server.use(passport.session());


server.use("/", require("./routes/Routes"));

server.listen(3000, console.log("Server started on port 3000"));