const db = require("../model/index");
class Blog {
  addBlog(req, res) {
    var log = {
      Title: req.body.title,
      Contents: req.body.contents,
      Image: req.file.filename,
      user_id: req.user.id,
      Likes: req.body.likes,
    };
    db.blogs
      .create(log)
      .then((oblog) => {
        res.status(201).json({ message: "Blog added successfully", oblog });
      })
      .catch((err) => res.send(err));
  }

  allBlogs(req,res) {
    db.blogs.findAll().then(result => res.status(200).send(result)).catch(err=>res.send(err))
  }
}
module.exports = Blog;
