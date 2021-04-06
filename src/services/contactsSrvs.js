const Contact = require("./schema/contactSchema");

const getAllContacts = async (
    userId,
    { limit = 5, page = 1, sortBy, sortByDesc, filter, favorite }
) => {
    const query = favorite ? { owner: userId, favorite } : { owner: userId };
    const options = {
        limit,
        page,
        favorite,
        sort: {
            ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
            ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
        },
        select: filter ? filter.split("|").join(" ") : "",
        populate: {
            path: "owner",
            select: "name email subscription -_id",
        },
    };
    const result = await Contact.paginate(query, options);
    const { totalDocs: totalContacts, docs: contacts } = result;
    return {
        limit: Number(limit),
        page: Number(page),
        totalContacts,
        contacts,
    };
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
