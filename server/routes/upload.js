import { createRequire } from "module";
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

export { upload }