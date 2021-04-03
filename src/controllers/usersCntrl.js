const userSrvs = require("../services/userSrvs");

const registration = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await userSrvs.findUserByEmail(email);
        if (user) {
            return res.status(409).json({
                status: "error",
                code: 409,
                message: "Email is already in use",
                data: "Conflict",
            });
        }

        const newUser = await userSrvs.createUserServ(req.body);

        res.status(201).json({
            status: "success",
            code: 201,
            data: {
                user: newUser,
                message: "Registration successful",
            },
        });
    } catch (error) {
        next(error);
    }
};
const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
    } catch (error) {
        next(error);
    }
};
const logout = async (req, res, next) => {};
const getCurrentUser = async (req, res, next) => {};
const updateUser = async (req, res, next) => {};

module.exports = {
    registration,
    login,
    logout,
    getCurrentUser,
    updateUser,
};
