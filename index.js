const userRoute = require("./routing/user");
const contentRoute = require("./routing/content");
const pictureRoute = require("./routing/uploadPicture");
const fileRoute = require("./routing/upload");

let express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const cors = require("cors");

//to parse json content
app.use(express.json());
//to parse body from url
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Create mongo connection
const conn = mongoose.createConnection(process.env.UPLOAD_PATH);

conn.once("open", () => {
  // Init stream
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads",
  });
});

conn.once("open", () => {
  // Init stream
  gridfsBucketPicture = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "picture",
  });
});

app.use(express.static("public"));
app.use("/api/user", userRoute);
app.use("/api/content", contentRoute);
app.use("/api/file", fileRoute);
app.use("/api/picture", pictureRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(process.env.PORT, () =>
  console.log(`Serveur running on port ${process.env.PORT}`)
);

