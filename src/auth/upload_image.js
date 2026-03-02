const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.join(__dirname, "../../public/images");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

exports.removeFile = async (fileName) => {
  try {
    if (!fileName) return;

    const fullPath = path.join(uploadPath, fileName);

    if (fs.existsSync(fullPath)) {
      await fs.promises.unlink(fullPath);
      console.log("File deleted:", fileName);
    }
  }catch (err) {
    console.error("Error deleting file:", err);
  }
};

const upload = multer({ storage });

module.exports = upload;
module.exports.removeFile = exports.removeFile;
