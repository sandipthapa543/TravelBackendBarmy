const db = require("../model/index");
const slugify = require("slugify");

class Blog {
  addBlog(req, res) {
    
    var log = {
      Title: req.body.Title,
      Slug: slugify(req.body.Title, {
        lower: true,
      }),
      Contents: req.body.Contents,
      Image: req.file.filename,
      user_id: req.user.id,
      Likes: req.body.Likes,
    };
    db.blogs
      .create(log)
      .then((oblog) => {
        res.status(201).json({ message: "Blog added successfully", oblog });
      })
      .catch((err) => res.send(err));
  }

  allBlogs(req,res) {
    db.blogs.findAll({include: db.users}).
    then(result => res.status(200).send(result))
        .catch(err=>res.send(err))
  }

  oneBlog(req,res) {
    db.blogs.findOne({where: {Slug: req.params.slug}, include: db.users}).
    then(result => res.status(201).send(result)).catch(err=>res.send(err))
  }
  singleBlog(req,res) {
    db.blogs.findOne({where: {id: req.params.id}, include: db.users}).
    then(result => res.status(201).send(result)).catch(err=>res.send(err))
  }

  updateBlog(req,res){
    db.blogs.update(req.body,{where:{id:req.params.id},include:db.users})
        .then(result => res.status(200).send(result))
        .catch(err=> res.send(err))
  }

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
      .findAll({where: {blog_id: req.params.id},include: db.users})
      .then((result) => res.status(200).send(result))
      .catch((err) => res.send(err));
  }
}
module.exports = Blog;
