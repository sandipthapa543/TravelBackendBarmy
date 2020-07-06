const db = require("../model/index");
const slugify = require("slugify");

class Blog {
  addBlog(req, res) {
    
    var log = {
      Title: req.body.title,
      Slug: slugify(req.body.title, {
        lower: true,
      }),
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

  oneBlog(req,res) {
    db.blogs.findByPk(req.params.id).then(result => res.status(201).send(result)).catch(err=>res.send(err))
  }
}
module.exports = Blog;
