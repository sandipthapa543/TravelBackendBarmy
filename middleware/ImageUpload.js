const multer = require("multer");

var packagestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/packages/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

var activitystorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/activities/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

var blogstorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/blogs/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(JPG|JPEG|PNG|GIF|jpg|jpeg|png|gif)$/)) {
    return cb(new Error("Please upload only image files!"), false);
  }
  cb(null, true);
};

var packageupload = multer({ storage: packagestorage, fileFilter: fileFilter });
var activityupload = multer({
  storage: activitystorage,
  fileFilter: fileFilter,
});

var blogupload = multer({
  storage: blogstorage,
  fileFilter: fileFilter,
});

exports.packageImage = packageupload.single("image");
exports.activityImage = activityupload.single("image");
exports.blogImage = blogupload.single("image");
