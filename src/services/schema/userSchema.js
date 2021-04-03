const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const SALT_FACTOR = 6;
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            default: "Guest",
            required: [true, "Name is required"],
            minlength: 2,
            maxlength: 22,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 3,
            maxlength: 20,
        },
        subscriptions: {
            type: String,
            required: [true, "Subscription is required"],
            minlength: 3,
            maxlength: 8,
            enum: ["starter", "pro", "business"],
            default: "starter",
        },
        token: {
            type: String,
            default: null,
        },
    },
    { versionKey: false, timestamps: true }
);

userSchema.path("email").validate(function (value) {
    const reg = /^\S+@\S+\.\S+/;
    return reg.test(String(value).toLowerCase());
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(
        this.password,
        bcrypt.genSaltSync(SALT_FACTOR)
    );
    next();
});

userSchema.methods.validPassword = async function (password) {
    return await bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
