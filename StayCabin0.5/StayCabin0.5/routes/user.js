const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

router.get("/signup/step2", userController.signupStep2Form);
router.post("/signup/step2", userController.signupComplete);

router.post("/login", userController.login);
router.post("/:id/favourites", userController.addFavourite);

module.exports = router;
