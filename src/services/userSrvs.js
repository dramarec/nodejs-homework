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

module.exports = { findUserByEmail, createUserServ };
