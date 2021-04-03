const express = require("express");
const router = express.Router();
const contactsCntrl = require("../../controllers/contactsCntrl");
const {
    validateCreateContact,
} = require("../../services/validation/contactsVldt");

router
    .get("/", contactsCntrl.getAll)
    .get("/:contactId", contactsCntrl.getById)
    .post("/", validateCreateContact, contactsCntrl.create)
    .patch("/:contactId/favorite", contactsCntrl.update)
    .delete("/:contactId", contactsCntrl.remove);

module.exports = router;
