
const express = require("express");
const path = require("path");

/**
 * -------------- GENERAL SETUP ----------------
 */

require("dotenv").config();

const app = express();

// Configures the database and opens a global connection that can be used in any module with `mongoose.connection`
require("./config/database");

require("./models/user");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

/**
 * -------------- ROUTES ----------------
 */

app.use(require("./routes"));

/**
 * -------------- SERVER ----------------
 */


app.listen(3000);