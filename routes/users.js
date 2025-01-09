const router = require("express").Router();
const pool = require("../config/database")
const utils = require("../lib/util")
const passport = require("passport");

router.post("/login", async function (req, res, next) {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [req.body.username]);
    const user = rows[0];
    if (!user) {
      return res.status(401).json({success: false, msg:"Could not find user"});
    }
    const isValid = utils.validPassword(req.body.password, user.hash, user.salt);
    if (isValid) {
      const tokenObject = utils.issueJWT(user);
      res.status(200).json({
        success:true,
        user: user,
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
      });
    } else {
      res.status(401).json({success: false, msg: "you have entered the wrong password"});
    }
  } catch(err) {
      next(err);
  }
 
});

router.get("/protected", passport.authenticate("jwt", {session: false}), (req, res) => {
  res.status(200).json({
    success: true,
    msg: "You are authenticated to this route"
  });
})



router.post("/register", async function (req, res, next) {
    const saltHash = utils.genPassword(req.body.password);

    const salt = saltHash.salt;
    const hash = saltHash.hash;
    const user = {
        username: req.body.username,
        hash: hash,
        salt: salt,
      };

  try {
    await pool.query("INSERT INTO users (username, salt, hash) VALUES ($1, $2, $3)", [
        req.body.username,
        salt,
        hash
      ]);
      res.json({success:true, user:user});
  } catch(err) {
    console.error("Error saving user:", err);
    res.json({ success: false, msg: err });
}
});

module.exports = router;