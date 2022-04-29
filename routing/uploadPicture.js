require("dotenv").config();
let express = require("express");
const router = express.Router();
const controle = require("../controllers/upload");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const path = require("path");

// Create storage engine
const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    // format du nom du fichier
    const filename =
      file.originalname + "-" + Date.now() + path.parse(file.originalname).ext;;
    const fileInfo = {
      filename: filename,
      bucketName: "picture",
    };
    return fileInfo;
  },
});

const upload = multer({ storage });

router.post("/", upload.single("picture"), controle.upload);
router.get("/", controle.allFiles);
router.get("/:filename", controle.fileByName);
router.get("/download/:filename", controle.download);
router.delete("/:id", controle.delete);

module.exports = router;
