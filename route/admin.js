const contract = require("../controller/admin/contract.js");
const err = require("../controller/public/err");

module.exports = function (app) {
  // Get in touch Section
  app.get("/API/contract", contract.getAll, err);
  app.get("/API/contract/:id", contract.getDetails, err);
  app.put("/API/contract/:id", contract.changeStatus, err);
  //
  // Login
};
