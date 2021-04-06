const Joi = require("joi");

const schemaCreateContact = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net", "ua", "ru"] },
        })
        .required(),
    phone: Joi.string().min(7).max(20).required(),
    favorite: Joi.boolean().optional(),
});

const schemaUpdateContact = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).optional(),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net", "ua", "ru"] },
        })
        .optional(),
    phone: Joi.string().min(7).max(20).optional(),
    favorite: Joi.boolean().optional(),
});

const schemaStatusContact = Joi.object({
    favorite: Joi.boolean().required().messages({
        "any.required": "missing field favorite",
    }),
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

module.exports.validateCreateContact = (req, res, next) => {
    return validate(schemaCreateContact, req.body, next);
};
module.exports.validateUpdateContact = (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next);
};
module.exports.validateUpdateStatusContact = (req, res, next) => {
    return validate(schemaStatusContact, req.body, next);
};
