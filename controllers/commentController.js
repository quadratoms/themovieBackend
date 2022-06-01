const Comment = require("../models/Comment");


exports.getAllcomments = async (req, res, next) => {
  try {
    const [comments, _] = await Comment.findAll(req.params.movieid);

    res.status(200).json({ count: comments.length, comments });
  } catch (error) {
    next(error);
  }
};

exports.createNewcomment = async (req, res, next) => {
  try {
    let { name,
      comment
    } = req.body;
    console.log(req.body);

    let com = new Comment(name,
      comment, req.params.movieid

    );

    comment = await com.save();

    res.status(201).json({ message: "comment created" });
  } catch (error) {
    next(error);
  }
};

