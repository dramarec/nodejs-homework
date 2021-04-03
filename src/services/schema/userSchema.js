const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema(
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
            validate: {
                validator: function (v) {
                    const reg = /^\S+@\S+\.\S+/;
                    return reg.test(String(v).toLowerCase());
                },
                message: (props) => `${props.value} is not a valid email!`,
            },
        },
        phone: {
            type: String,
            validate: {
                validator: function (v) {
                    return /^\(?[0][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/.test(
                        v
                    );
                },
                message: (props) => `${props.value}! Please try (044)123-45-67`,
            },
            unique: true,
            required: [true, "User phone number required"],
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

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
