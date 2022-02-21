const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controller/users-controller");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.get("/", usersController.getUsers);

router.post(
  "/signup",
  fileUpload.single("image"),
  [
    check("name").isLength({ min: 3 }),
    check("email")
      .normalizeEmail() // Test@gmail.com => test@gmail.com
      .isEmail(),
    check("password").isLength({ min: 6, max: 30 }),
  ],
  usersController.signup
);

router.post("/login", usersController.login);

module.exports = router;
