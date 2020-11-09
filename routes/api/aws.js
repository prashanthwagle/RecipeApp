const express = require("express");
const router = express.Router();
const multer = require("multer");
const AWS = require("aws-sdk");
const fs = require("fs");
var path = require("path");

//aws creds: please keep this a secret
const ID = "HireMe!";
const SECRET = "HireMeFast!";
const BUCKET_NAME = "Nah!";

const config = {
  accessKeyId: ID,
  secretAccessKey: SECRET,
};

const deleteAWS = (image) => {
  // const prom = new Promise((resolve,reject)=>{
  //     console.log("Image is "+image)
  //     resolve("Resolved");
  // });

  AWS.config.update(config);

  var s3 = new AWS.S3({ region: "ap-south-1" });

  let imageName = image.split("/").pop();

  var params = { Bucket: "recipeappmonk", Key: imageName };

  s3.deleteObject(params, (err, data) => {
    if (err) {
      console.log("Error");
      throw err;
    } else console.log("Deleted");
  }).promise();
};

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const filePath = path.resolve() + "/public/";
    console.log(filePath);
    callback(
      null,
      "/home/prashanthwagle/Documents/Programming/Projects/CodeMonk/routes/api/public/"
    );
    //callback(null, path.resolve(".")+"/public/");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

const uploadToS3 = (file) => {
  AWS.config.update(config);

  const s3 = new AWS.S3({ region: "ap-south-1" });

  const params = {
    Bucket: BUCKET_NAME,
  };

  params.Key = Date.now() + file.originalname;
  params.Body = fs.createReadStream(file.path);
  params.ContentType = file.mimetype;

  return s3
    .upload(params, (err, data) => {
      if (err) throw err;
      console.log("File Uploaded successfully");
      fs.unlinkSync(file.originalname);
    })
    .promise();
};

router.get("/test", (req, res) => {
  console.log(req.data);
  res.json({ message: "AWS Route Success" });
});

router.post("/", upload.array("recipe"), (req, res, next) => {
  console.log("recieved request ");
  try {
    const files = req.files;
    if (!files) {
      res.status(400).json({
        status: "failed",
        code: "400",
        message: "Please upload file",
      });
    }

    //Design an array and push uploadToS3 which returns promises
    //Then do Pro
    let promises = [];
    files.forEach((file) => {
      promises.push(uploadToS3(file));
    });

    Promise.all(promises)
      .then((data) => {
        res.status(200).json({ imageArray: data.map((a) => a.Location) });
      })
      .catch((err) => console.log("Error in Promise"));
  } catch (err) {
    console.log(err.message);
    res.status(200).json({
      status: "failed",
      code: "500",
      message: err.message,
    });
  }
});

module.exports = router;
module.exports.deleteAWS = deleteAWS;
