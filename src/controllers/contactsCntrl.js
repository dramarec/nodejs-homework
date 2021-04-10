const service = require("../services/contactsSrvs");

const getAll = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const results = await service.getAllContacts(userId, req.query);
        res.json({
            message: "All contacts",
            status: "SUCCES",
            code: 200,
            data: { ...results },
        });
    } catch (err) {
        next(err);
    }
};

const getById = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await service.getContactById(contactId);
        if (result) {
            res.json({
                message: "Contact by id",
                status: "SUCCES",
                code: 200,
                data: { contact: result },
            });
        } else {
            res.status(404).json({
                message: `Not Found Contact id: ${contactId}`,
                status: "ERROR",
                code: 404,
            });
        }
    } catch (err) {
        next(err);
    }
};

const create = async (req, res, next) => {
    try {
        const result = await service.createContact(req.body);
        res.status(201).json({
            message: "Contact Added",
            status: "SUCCES",
            code: 201,
            data: { contact: result },
        });
    } catch (err) {
        next(err);
    }
};

const update = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await service.updateContact(contactId, req.body);
        if (result) {
            res.json({
                message: "Contact UPDATED",
                status: "SUCCES",
                code: 200,
                data: { contact: result },
            });
        } else {
            res.status(404).json({
                status: "ERROR",
                code: 404,
                message: `Not Found Contact id: ${contactId}`,
                data: "Not Found",
            });
        }
    } catch (err) {
        next(err);
    }
};

const remove = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await service.removeContact(contactId);
        if (result) {
            res.json({
                message: "Contact DELETED",
                status: "SUCCES",
                code: 200,
                data: { contact: result },
            });
        } else {
            res.status(404).json({
                message: `Not Found Contact id: ${contactId}`,
                status: "ERROR",
                code: 404,
                data: "Not Found",
            });
        }
    } catch (err) {
        next(err);
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove,
};
