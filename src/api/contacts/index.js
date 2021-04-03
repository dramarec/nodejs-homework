const express = require("express");
const router = express.Router();
const contrlContacts = require("../../controller/contactsCntrl");

router
    .get("/", contrlContacts.getAll)
    .get("/:contactId", contrlContacts.getById)
    .post("/", contrlContacts.create)
    .patch("/:contactId/favorite", contrlContacts.update)
    .delete("/:contactId", contrlContacts.remove);

module.exports = router;
