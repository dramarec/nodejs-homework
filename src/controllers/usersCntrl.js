const userSrvs = require("../services/userSrvs");
const { HttpCode } = require("../helpers/constants");

const jwt = require("jsonwebtoken");
require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const registration = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await userSrvs.findUserByEmail(email);
        if (user) {
            return res.status(409).json({
                status: "error",
                code: HttpCode.CONFLICT,
                message: "Email is already in use",
                data: "Conflict",
            });
        }

        const newUser = await userSrvs.createUserServ({
            name,
            email,
            subscription,
        });

        res.status(201).json({
            status: "success",
            code: HttpCode.CREATED,
            data: {
                name: newUser.name,
                user: newUser,
                message: "Registration successful",
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

        if (!user || !(await user.validPassword(password))) {
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
                user: {
                    name: user.name,
                    email: user.email,
                    subscription: user.subscription,
                },
                token,
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
    registration,
    login,
    logout,
    getCurrentUser,
    updateUser,
};
