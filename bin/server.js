const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const server = express();

const formatsLogger = server.get("env") === "development" ? "dev" : "short";

server.use(logger(formatsLogger));
server.use(cors());
server.use(express.json());

const contactsRouter = require("../src/api");
server.use("/api/contacts", contactsRouter);

server.use((_, res) => {
    res.status(404).json({
        status: "error",
        code: 404,
        message: "Use api on routes: /api/contacts",
        data: "Not found",
    });
});

server.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({
        status: "fail",
        code: 500,
        message: err.message,
        data: "Internal Server Error",
    });
});

const PORT = process.env.PORT || 3000;
const uirDb = process.env.DB_HOST;

const cennection = mongoose.connect(uirDb, {
    promiseLibrary: global.Promise,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});

cennection
    .then(() => {
        server.listen(PORT, () => {
            console.log(`Server running. Use our API on port: ${PORT}`);
        });
    })
    .catch((err) =>
        console.log(`Server not running. Error message: ${err.message}`)
    );
