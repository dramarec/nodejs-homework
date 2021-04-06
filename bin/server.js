const db = require("../src/services/db");
const app = require("../src/app");
const createFolderIfNotExist = require("../src/helpers/createDir");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const UPLOAD_Folder = path.join(__dirname, "..", "src", process.env.UPLOAD_DIR);
const IMG_DIR = path.join(__dirname, "..", "src", "public", "avatars");

const PORT = process.env.PORT || 3000;

db.then(() => {
    app.listen(PORT, async () => {
        await createFolderIfNotExist(UPLOAD_Folder);
        await createFolderIfNotExist(IMG_DIR);
        console.log(`Server running. Use our API on port: ${PORT}`);
    });
}).catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
);
