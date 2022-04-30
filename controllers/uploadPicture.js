const mongoose = require("mongoose");

// uploads file to DB
exports.upload = async (req, res) => {
  res.json({ file: req.file });
};

// GET all files
exports.allFiles = async (req, res) => {
  const files = await gridfsBucketPicture.find().toArray();
  if (!files || files.length === 0) {
    return res.status(404).json({
      err: "No files exist",
    });
  }
  // Files exist
  return res.json(files);
};

// GET info about the file with filename
exports.fileByName = async (req, res) => {
  const file = await gridfsBucketPicture
    .find({ filename: req.params.filename })
    .toArray();
  // Check if file
  if (!file || file.length === 0) {
    return res.status(404).json({
      err: "No file exists",
    });
  }
  // File exists
  return res.json(file[0]);
};

// GET the file
exports.download = async (req, res) => {
  const file = await gridfsBucketPicture
    .find({ filename: req.params.filename })
    .toArray();
  // Check if file
  if (!file || file.length === 0) {
    return res.status(404).json({
      err: "No file exists",
    });
  }
  // Read output to browser
  const readStream = await gridfsBucketPicture.openDownloadStream(file[0]._id);
  readStream.pipe(res);
};

// DELETE the file
exports.delete = async (req, res) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    gridfsBucketPicture.delete(id);
    res.json({ message: "deleted" });
  } catch (err) {
    res.json({ message: err.message });
  }
};
