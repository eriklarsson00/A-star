const express = require("express");
const app = express();
const http = require("http");
const WebSocket = require("ws");
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const path = require("path");
const fs = require("fs");
const multer = require("multer");



wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message, isBinary) {
    console.log(message.toString());
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../Images")
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

app.post("/", upload.single("image"), (req, 
  res) => {
    console.log(req.file);
    res.send("Single File test");
  })
/*
const upload = multer({
  storage: multer.diskStorage({
  dest: "./Images"
  })
  // you might also want to set some limits: https://github.com/expressjs/multer#limits
});

*/

/*
app.post(
  "/",

  (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./uploads/image.png");
    console.log(req.file);
    
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);

        res
          .status(200)
          .contentType("text/plain")
          .end("File uploaded!");
      });
    
  }
);
*/


server.listen(8080, () => {
  console.log("Listening to port 8080");
});