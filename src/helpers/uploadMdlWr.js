const path = require("path");
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();

const folder = path.join(__dirname, "..", process.env.UPLOAD_DIR);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, folder);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
    limits: { fileSize: 2000000 },
});
const uploadMiddleware = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.includes("image")) {
            cb(null, true);
            return;
        }
        cb(null, false);
    },
});
module.exports = uploadMiddleware;
