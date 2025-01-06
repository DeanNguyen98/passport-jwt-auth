const router = require("express").Router();
const pool = require("../config/database")
const utils = require("../lib/util")
router.post("/login", function (req, res, next) {});

router.get("/main", (req,res) => {
    res.send("hello");
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