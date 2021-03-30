const Contact = require("./schemas/contactSchema");

const getAllContacts = (params = {}) => {
    return Contact.find(params);
};

const getContactById = (contactId) => {
    return Contact.findOne({ _id: contactId });
};

const createContact = (fields) => {
    return Contact.create(fields);
};

const updateContact = (contactId, fields) => {
    return Contact.findByIdAndUpdate(contactId, fields, { new: true });
};

const removeContact = (contactId) => {
    return Contact.findByIdAndRemove(contactId);
};

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    removeContact,
};
