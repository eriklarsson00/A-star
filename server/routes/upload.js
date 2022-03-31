import { createRequire } from "module";
const require = createRequire(import.meta.url);

var multer = require("multer");
var AWS = require("aws-sdk");

var accessKeyId = "AKIAYBFRUZFNSL7KZ3HD";
var secretAccessKey = "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";

AWS.config.update({
  accessKeyId: accessKeyId,
  secretAccessKey: secretAccessKey,
});

var s3 = new AWS.S3();

app.use(
  multer({
    // https://github.com/expressjs/multer
    dest: "./upload",
    limits: { fileSize: 100000 },
    rename: function (fieldname, filename) {
      return filename.replace(/\W+/g, "-").toLowerCase();
    },
    onFileUploadData: function (file, data, req, res) {
      // file : { fieldname, originalname, name, encoding, mimetype, path, extension, size, truncated, buffer }
      var params = {
        Bucket: "matsamverkan",
        Key: file.name,
        Body: data,
      };

      s3.putObject(params, function (perr, pres) {
        if (perr) {
          console.log("Error uploading data: ", perr);
        } else {
          console.log("Successfully uploaded data to myBucket/myKey");
        }
      });
    },
  })
);

app.post("/upload", function (req, res) {
  if (req.files.image !== undefined) {
    // `image` is the field name from your form
    res.redirect("/uploads"); // success
  } else {
    res.send("error, no file chosen");
  }
});
