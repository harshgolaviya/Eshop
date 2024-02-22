const { expressjwt: jwt } = require("express-jwt");
function express_jwt() {
  const secret = process.env.secret;
  return jwt({
    secret: secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      { url: "/category", methods: ["GET", "OPTIONS"] },
      `/users/login`,
      `/users/register`,
    ],
  });
}

module.exports = express_jwt;                                                           