const User = require("./schema/userSchema");
const { nanoid } = require("nanoid");
const EmailService = require("./emailSrvs");
const { ErrorHandler } = require("../helpers/errorHandler");

const emailService = new EmailService(process.env.NODE_ENV);

const verifyServ = async ({ token }) => {
    const user = await User.findOne({
        verifyToken: token,
    });
    if (user) {
        await user.updateOne({ isVerify: true, verifyToken: null });
        return true;
    }
    return false;
};

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const createUserServ = async ({ name, email, password, subscription }) => {
    const verifyToken = nanoid();
    try {
        await emailService.sendEmail(verifyToken, email, name);
    } catch (error) {
        throw new ErrorHandler(503, error.message, "Service Unavailable");
    }
    const result = await new User({
        name,
        email,
        password,
        subscription,
        verifyToken,
    });
    return result.save();
};

const updateTokenServ = async (id, token) => {
    return await User.updateOne({ _id: id }, { token });
};

const updateUserServ = async (id, body) => {
    return await User.findByIdAndUpdate(
        { _id: id },
        { ...body },
        { new: true }
    );
};

const findUserById = async (id) => {
    return await User.findOne({ _id: id });
};

const updateAvatar = async (id, newName) => {
    return await User.findByIdAndUpdate(
        { _id: id },
        { avatarURL: newName },
        { new: true }
    );
};

module.exports = {
    verifyServ,
    findUserByEmail,
    createUserServ,
    updateTokenServ,
    updateUserServ,
    findUserById,
    updateAvatar,
};
