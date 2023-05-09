const user = require("../controller/user/login.js");
const restaurant = require("../controller/user/restaurant.js");
const err = require("../controller/public/err");

module.exports = function (app) {
  app.post("/API/register", user.register, err);
  app.post("/API/login", user.login, err);
};
