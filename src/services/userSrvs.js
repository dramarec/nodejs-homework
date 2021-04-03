const User = require("./schema/userSchema");

const findUserByEmail = async (email) => {
    const result = await User.findOne({ email });
    return result;
};

const createUserServ = async ({ name, email, password, subscription }) => {
    const result = await new User({
        name,
        email,
        password,
        subscription,
    });
    return result.save();
};
const updateTokenServ = async (id, token) => {
    return await User.updateOne({ _id: id }, { token });
};
const loginAuthService = async () => {};

const logoutAuthService = async () => {};

module.exports = { findUserByEmail, createUserServ, updateTokenServ };
