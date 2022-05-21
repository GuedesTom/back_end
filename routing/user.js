const express = require("express");
const controller = require("../controllers/user");
const router = express.Router();

router.get("/", controller.isLoggedIn, controller.afficherById);
router.get("/all", controller.isLoggedIn, controller.afficherAll);
router.get("/:id", controller.isLoggedIn, controller.afficherUser); 
router.post("/signup", controller.signUp);
router.post("/login", controller.login);
router.patch("/:id", controller.isLoggedIn, controller.modif);

module.exports = router;
