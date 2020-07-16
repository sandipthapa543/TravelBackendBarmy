const db = require("../model/index");
class BlogComment {
  addBlogComment(req, res) {
    var blogcmt = {
      blod_id: req.user.id,
      user_id: req.user.id,
      Comments: req.body.comments,
    };
    db.blogcomment
      .create(blogcmt)
      .then((cmt) => {
        res.status(201).json({ message: "Blog comment successfully", cmt });
      })
      .catch((err) => res.send(err));
  }

  allBlogComment(req, res) {
    db.blogcomment
      .findAll()
      .then((result) => res.status(200).send(result))
      .catch((err) => res.send(err));
  }
}
module.exports = BlogComment;
