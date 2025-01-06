const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const fs = require("fs");
const path = require("path");
const pool = require("../config/database"); // Import the PostgreSQL pool instance

const pathToKey = path.join(__dirname, "..", "id_rsa_pub.pem");

const PUB_KEY = fs.readFileSync(pathToKey, "utf8");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ["RS256"],
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(options, async (jwt_payload, done) => {
      try {
        // Query the database to find the user by ID (stored in jwt_payload.sub)
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [jwt_payload.sub]);

        if (result.rows.length > 0) {
          const user = result.rows[0];
          return done(null, user); // User found, pass it to the done callback
        } else {
          return done(null, false); // No user found
        }
      } catch (err) {
        console.error("Error querying the database:", err);
        return done(err, false); // Handle any database errors
      }
    })
  );
};