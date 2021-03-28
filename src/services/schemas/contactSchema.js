const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            minlength: 2,
            maxlength: 22,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
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
        subscriptions: {
            type: String,
            required: [true, "Subscription is required"],
            minlength: 3,
            maxlength: 8,
            enum: ["free", "pro", "premium"],
            default: "free",
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
            maxlength: 20,
        },
        token: {
            type: String,
            default: "",
        },
    },
    { versionKey: false, timestamps: true }
);

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
