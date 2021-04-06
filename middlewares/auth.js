const fs = require("fs");
const publicKey = fs.readFileSync("./keys/public.pem");
const jwt = require("jsonwebtoken");
const secured = (req, res, next) => {
  try {
    // req.headers.authorization
    const { authorization } = req.headers;
    const { id, role } = jwt.verify(authorization, publicKey); // { id: user.id }

    req.id = id;
    req.role = role;
    next();
  } catch (e) {
    console.log(e);
    res.sendStatus(401);
  }
};
const isAdmin = async (req, res, next) => {
  const user = (await pool()).collection("usuarios").findById(req._id);
  const roles = (await pool())
    .collection("usuarios")
    .find({ _id: { $in: user.roles } });
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "requiere ser admin" });
};

module.exports = { secured, isAdmin };
