const homepage = require("../controller/guest/homepage.js");
const blog = require("../controller/guest/blog.js");
const contract = require("../controller/guest/contract.js");
const err = require("../controller/public/err");

module.exports = function (app) {
  // Homepage
  app.get("/API/guest/homepage", homepage.getData, err);
  // Blog
  app.get("/API/guest/blogs", blog.getAll, err);
  // Get in touch Section
  app.post("/API/guest/contract", contract.sentMessage, err);
};
