const user = require("./user");
const guest = require("./guest");

const upload = require("../controller/public/upload");

module.exports = function (app) {
  user(app);
  guest(app);

  // PB
  app.post("/API/upload/:path", upload.upload);
  app.get("/API/image/:main/:path/:key", upload.getImage);
};
