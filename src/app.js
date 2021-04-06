const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./api/contacts");
const usersRouter = require("./api/users");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use("/api/users", usersRouter);
//---
const path = require("path");
const fs = require("fs").promises;
const dotenv = require("dotenv");
dotenv.config();
// const jimp = require("jimp");
const uploadMiddleware = require("./helpers/uploadMdlWr");

const IMG_DIR = path.join(__dirname, "..", "src", "public", "avatars");

app.use(express.static(path.join(__dirname, "public")));

app.post(
    "/api/users/avatars",
    uploadMiddleware.single("avatar"),
    async (req, res, next) => {
        console.log("avatar req.file ===>", req.file);
        console.log("avatar req.body ===>", req.body);

        const { path: tempName, originalname } = req.file;
        const newName = path.join(IMG_DIR, originalname);

        // console.log("newName", newName);
        try {
            await fs.rename(tempName, newName);
        } catch (error) {
            next(error);
        }
    }
);

app.use((req, res) => {
    res.status(404).json({
        status: "error",
        code: 404,
        message: `Use api on routes: ${req.baseUrl} /api/contacts`,
        data: "Not found",
    });
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({
        status: "fail",
        code: 500,
        message: `${err.message.replace(/"/g, "")}`,
        data: "Internal Server Error",
    });
});

module.exports = app;
