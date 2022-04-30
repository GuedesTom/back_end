const express = require("express");
const controller = require("../controllers/user");
const router = express.Router();

router.get("/", controller.isLoggedIn, controller.afficherById);
router.post("/signup", controller.signUp);
router.post("/login", controller.login);
router.patch("/:id", controller.isLoggedIn, controller.modif);
router.get("/all", controller.isLoggedIn, controller.afficherAll);

module.exports = router;
