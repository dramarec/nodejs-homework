const User = require("./schema/userSchema");

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
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
    findUserByEmail,
    createUserServ,
    updateTokenServ,
    updateUserServ,
    findUserById,
    updateAvatar,
};
