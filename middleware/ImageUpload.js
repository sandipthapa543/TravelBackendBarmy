const multer = require("multer");

var packagestorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/packages/");
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

exports.packageImage = packageupload.single("image");
