const Joi = require("joi");

const schemaAuthUser = Joi.object({
    name: Joi.string().min(2).max(30).optional(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net", "ua", "ru"] },
        })
        .optional(),
    password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,10}$"))
        .required(),
    subscription: Joi.string().valid("starter", "pro", "business").optional(),
});

const schemaUpdateUser = Joi.object({
    name: Joi.string().min(2).max(30).optional(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net", "ua", "ru"] },
        })
        .optional(),
    subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const validate = (schema, body, next) => {
    const { error } = schema.validate(body);
    if (error) {
        const [{ message }] = error.details;
        return next({
            status: 400,
            message: `Field: ${message.replace(/"/g, "")}`,
            data: "BAD_REQUEST",
        });
    }
    next();
};

module.exports.validateAuth = (req, res, next) => {
    return validate(schemaAuthUser, req.body, next);
};

module.exports.validateUpdateUser = (req, res, next) => {
    return validate(schemaUpdateUser, req.body, next);
};