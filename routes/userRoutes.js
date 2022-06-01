const express = require("express");
const userControllers = require("../controllers/userControllers");
const router = express.Router();

// @route GET && POST - /posts/
router
  .route("/")
  .get(userControllers.getAllusers)
  .post(userControllers.createNewuser);

router.route("/:id")
  .get(userControllers.getuserById)

router.route("/login").post(userControllers.login)

module.exports = router;
