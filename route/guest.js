const blog = require("../controller/guest/blog.js");
const err = require("../controller/public/err");

module.exports = function (app) {
  app.get("/API/guest/blogs", blog.getAll, err);
};
