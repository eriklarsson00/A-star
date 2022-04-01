import { createRequire } from "module";
import S3 from 'aws-sdk/clients/s3';

const require = createRequire(import.meta.url);

const multer = require("multer");
const path = require("path");
const fs = require("fs");





const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../Images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer( {storage: fileStorageEngine});


const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

const uploadImageOnS3 = async (file) => {
  console.log("HEJ");
  const s3bucket = new S3({
    accessKeyId: process.env.AWS_accessID,
    secretAccessKey: process.env.AWS_secretKEY,
    Bucket: "matsamverkan",
    signatureVersion: 'v4',
  });
let contentType = 'image/jpeg';
  let contentDeposition = 'inline;filename="' + file.name + '"';
  const base64 = await fs.readFile(file.uri, 'base64');
  const arrayBuffer = decode(base64);
s3bucket.createBucket(() => {
    const params = {
      Bucket: "matsamverkan",
      Key: file.name,
      Body: arrayBuffer,
      ContentDisposition: contentDeposition,
      ContentType: contentType,
  };
s3bucket.upload(params, (err, data) => {
    if (err) {
      console.log('error in callback');
    }
  console.log('success');
  console.log("Respomse URL : "+ data.Location);
  });
});
};


export { upload, uploadImageOnS3 }