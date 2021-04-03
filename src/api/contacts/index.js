const express = require("express");
const router = express.Router();
const contrlContacts = require("../../controller/contactsCntrl");
const {
    validateCreateContact,
} = require("../../services/validation/contactsVldt");

router
    .get("/", contrlContacts.getAll)
    .get("/:contactId", contrlContacts.getById)
    .post("/", validateCreateContact, contrlContacts.create)
    .patch("/:contactId/favorite", contrlContacts.update)
    .delete("/:contactId", contrlContacts.remove);

module.exports = router;
