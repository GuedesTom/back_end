require("dotenv").config();
let express = require("express");
const router = express.Router();
const controle = require("../controllers/uploadPicture");
const userController = require("../controllers/user");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const path = require("path");

// Create storage engine
const storage = new GridFsStorage({
  url: process.env.UPLOAD_PATH,
  file: (req, file) => {
    // format du nom du fichier
    const filename = file.originalname;
    const fileInfo = {
      filename: filename,
      bucketName: "picture",
    };
    return fileInfo;
  },
});

const upload = multer({ storage });

router.post(
  "/",
  userController.isLoggedIn,
  upload.single("picture"),
  controle.upload
);
router.get("/", userController.isLoggedIn, controle.allFiles);
router.get("/download/:filename", controle.download);
router.get("/:filename", controle.fileByName);
router.delete("/:id", userController.isLoggedIn, controle.delete);

module.exports = router;
