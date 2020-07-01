const db = require("../model/index");
class Blog {
  addBlog(req, res) {
    var log = {
      Title: req.body.title,
      Contents: req.body.contents,
      Image: req.file.filename,
      user_id: req.body.user_id,
      Likes: req.body.likes,
    };
    db.blogs
      .create(log)
      .then((oblog) => {
        res.status(201).json({ message: "Blog added successfully", oblog });
      })
      .catch((err) => res.send(err));
  }
}
module.exports = Blog;
