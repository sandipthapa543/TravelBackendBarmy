const db = require("../model/index");
class BlogComment {
  addBlogComment(req, res) {
    var blogcmt = {
      blog_id: req.body.blog_id,
      user_id: req.user.id,
      Comments: req.body.Comments,
    };
    db.blogcomment
      .create(blogcmt)
      .then((cmt) => {
        res.status(201).json({ message: "Comment added successfully", cmt });
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
