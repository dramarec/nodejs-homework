const db = require("../src/services/db");
const app = require("../src/app");
const createFolderIfNotExist = require("../src/helpers/createDir");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;

db.then(() => {
    app.listen(PORT, async () => {
        const UPLOAD_Folder = path.join(
            __dirname,
            "..",
            "src",
            process.env.UPLOAD_DIR
        );
        const SAVE_IMG = path.join(__dirname, "..", "src", process.env.IMG_DIR);
        await createFolderIfNotExist(UPLOAD_Folder);
        await createFolderIfNotExist(SAVE_IMG);
        console.log(`Server running. Use our API on port: ${PORT}`);
    });
}).catch((err) =>
    console.log(`Server not running. Error message: ${err.message}`)
);
