const userSrvs = require("../services/userSrvs");
const { HttpCode } = require("../helpers/constants");

const jwt = require("jsonwebtoken");
require("dotenv").config();
const { SECRET_KEY, IMG_DIR } = process.env;

const Jimp = require("jimp");
const path = require("path");
const fs = require("fs").promises;
const createFolderIfNotExist = require("../helpers/createDir");

const SAVE_IMG = path.join(__dirname, "..", IMG_DIR);

const verify = async (req, res, next) => {
    try {
        const result = await userSrvs.verifyServ(req.params);
        if (result) {
            return res.status(HttpCode.OK).json({
                status: "success",
                code: HttpCode.OK,
                data: {
                    message: "Verification successful",
                },
            });
        } else {
            return next({
                status: HttpCode.BAD_REQUEST,
                message:
                    "Your verification token is not valid. Contact with administration",
            });
        }
    } catch (e) {
        next(e);
    }
};

const avatar = async (req, res, next) => {
    const { path: tempName, originalname } = req.file;
    const { id } = req.user;
    await createFolderIfNotExist(SAVE_IMG);
    const img = await Jimp.read(tempName);
    await img
        .autocrop()
        .cover(
            250,
            250,
            Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE
        )
        .writeAsync(tempName);

    const newName = path.join(
        SAVE_IMG,
        `avatar${id}${path.extname(originalname)}`
    );
    try {
        await fs.rename(tempName, newName);
        const newAvatar = await userSrvs.updateAvatar(id, newName);
        return res.status(HttpCode.OK).json({
            status: "success",
            code: HttpCode.OK,
            data: {
                user: {
                    email: newAvatar.email,
                    avatarURL: newAvatar.avatarURL,
                },
            },
        });
    } catch (error) {
        await fs.unlink(tempName);
        next(error);
    }
};

const registration = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await userSrvs.findUserByEmail(email);
        if (user) {
            return res.status(409).json({
                status: "error",
                code: HttpCode.CONFLICT,
                message: "Email in use",
                data: "Conflict",
            });
        }

        const newUser = await userSrvs.createUserServ(req.body);

        res.status(201).json({
            status: "success",
            code: HttpCode.CREATED,
            data: {
                user: {
                    email: newUser.email,
                    subscription: newUser.subscription,
                    message: "Registration successful",
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userSrvs.findUserByEmail(email);

        if (!user || !(await user.validPassword(password)) || !isVerify) {
            return res.status(401).json({
                status: "error",
                code: HttpCode.UNAUTHORIZED,
                message: "Email or password is wrong",
                data: null,
            });
        }
        const payload = { id: user.id };

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });

        await userSrvs.updateTokenServ(payload.id, token);

        return res.status(HttpCode.OK).json({
            status: "success",
            code: HttpCode.OK,
            data: {
                token,
                user: {
                    email: user.email,
                    subscription: user.subscription,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        const id = req.user.id;
        await userSrvs.updateTokenServ(id, null);
        return res.status(HttpCode.OK).json({
            status: "No Content",
            code: HttpCode.NO_CONTENT,
            message: "Logout",
        });
    } catch (error) {
        next(error);
    }
};

const getCurrentUser = async (req, res, next) => {
    try {
        const user = req.user;
        return res.status(HttpCode.OK).json({
            status: "success",
            code: HttpCode.OK,
            data: {
                user: {
                    email: user.email,
                    subscription: user.subscription,
                    avatarURL: user.avatarURL,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

const updateUser = async (req, res, next) => {
    try {
        const id = req.user.id;
        const user = await userSrvs.updateUserServ(id, req.body);
        return res.status(HttpCode.OK).json({
            status: "success",
            code: HttpCode.OK,
            data: {
                user: {
                    name: user.name,
                    email: user.email,
                    subscription: user.subscription,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    verify,
    registration,
    login,
    logout,
    getCurrentUser,
    updateUser,
    avatar,
};
