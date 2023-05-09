var resp = require("./response");

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const spacesEndpoint = new aws.Endpoint(process.env.BUCKET_ENDPOINT);
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
  accessKeyId: process.env.BUCKET_KEY,
  secretAccessKey: process.env.BUCKET_SECREET,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET,
    key: function (req, file, cb) {
      cb(
        null,
        process.env.BUCKET_PATH +
          "/" +
          req.params.path +
          "/" +
          new Date().getTime() +
          "_" +
          file.originalname
      );
    },
  }),
}).single("image");

exports.upload = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      console.log(`err`, err);
      res.status(400).json({
        success: "error",
        message: err.message,
      });
      if (err) return next(err);
    } else {
      let path = req.file.key;
      res.status(200).json({
        success: "success",
        message: "Image Uploaded Successfully !",
        path: path,
      });
    }
  });
};

exports.getImage = (req, res, next) => {
  console.log(`getImage`);
  let key = req.params.key;

  var getParams = {
    Bucket: process.env.BUCKET,
    Key: req.params.main + "/" + req.params.path + "/" + key,
  };

  s3.getObject(getParams, function (err, data) {
    if (err) {
      if (err) return next(err);
    } else {
      res.writeHead(200, {
        "Content-Type": "image/png",
      });
      res.write(data.Body, "binary");
      res.end(null, "binary");
    }
  });
};
