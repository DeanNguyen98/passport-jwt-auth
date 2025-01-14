const passport = require("passport")
const express = require("express");
const path = require("path");
const cors = require("cors");

/**
 * -------------- GENERAL SETUP ----------------
 */

require("dotenv").config();

const app = express();

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
require("./config/database");

require("./models/user");

require("./config/passport")(passport);

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use(cors({
    origin: "http://localhost:5173", // React app's port
    credentials: true,
  }));
/**
 * -------------- ROUTES ----------------
 */



app.use(require("./routes"));

/**
 * -------------- SERVER ----------------
 */


app.listen(3000);