const express = require("express");
const router = express.Router();
const fs = require("fs"); //file system
const jwt = require("jsonwebtoken");
const sha1 = require("sha1");
const privateKey = fs.readFileSync("./keys/private.pem");
const service = require("./../models/auth");
// npmjs.com
const signOptions = { expiresIn: "8h" };
const createToken = (payload) => jwt.sign(payload, privateKey, signOptions);

const auth = async (req, res) => {
  try {
    const { mail, password } = req.body;
    const user = await service.authenticate(mail, sha1(password));
    console.log(user);
    if (!user) res.sendStatus(401);
    if (!user.habilitado) res.sendStatus(401);
    if (user.habilitado) {
      const token = createToken({ id: user._id, role: user.role });
      res.status(200).json({ jwt: token, info: { user } });
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
};
// localhost:3000/auth [POST]
router.post("/", auth);

module.exports = router;
