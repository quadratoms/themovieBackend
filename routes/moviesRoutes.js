const express = require("express");
const movieControllers = require("../controllers/movieControllers");
const commentController = require("../controllers/commentController");
const router = express.Router();

// @route GET && POST - /posts/
router
  .route("/")
  .get(movieControllers.getAllmovies)
  .post(movieControllers.createNewmovie);

router.route("/:id")
  .get(movieControllers.getmovieById)
router.route('/:movieid/comment')
.get(commentController.getAllcomments)
.post(commentController.createNewcomment)
  // .put(movieControllers.updatemovie);

module.exports = router;
