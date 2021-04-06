const { pool } = require("./../utils/db");

const authenticate = async (mail, password) => {
  try {
    return (await pool()).collection("usuarios").findOne({
      $and: [
        { mail: { $eq: mail } },
        { password: { $eq: password } },
        { habilitado: { $eq: true } },
      ],
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const isAdmin = async (req, res, next) => {
  const user = await pool().collection("usuarios").findById(req._id);
  const roles = await (await pool())
    .collection("roles")
    .find({ _id: { $in: user.roles } });
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }
  return res.status(403).json({ message: "requiere ser admin" });
};
// return []
// return [{}]
module.exports = { authenticate, isAdmin };
