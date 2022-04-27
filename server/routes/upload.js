import { createRequire } from "module";
import S3 from "aws-sdk/clients/s3.js";

const require = createRequire(import.meta.url);

const multer = require("multer");
const fs = require("fs");

const fileStorageEngine = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

const uploadImageOnS3 = (file, bucketPath) => {
  const s3bucket = new S3({
    accessKeyId: process.env.AWS_accessID,
    secretAccessKey: process.env.AWS_secretKEY,
    Bucket: "matsamverkan",
    signatureVersion: "v4",
  });

  const arrayBuffer = fs.readFileSync(file.path, null);

  const params = {
    Bucket: "matsamverkan",
    Key: bucketPath,
    Body: arrayBuffer,
    ContentDisposition: 'inline;filename="' + file.filename + '"',
    ContentType: "image/jpeg",
    ContentEncoding: file.encoding,
  };

  return s3bucket.upload(params).promise();
};

export { upload, uploadImageOnS3 };
