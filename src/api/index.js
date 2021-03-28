const express = require("express");
const router = express.Router();
const contrlContacts = require("../controller");

router
    .get("/", contrlContacts.getAll)
    .get("/:contactId", contrlContacts.getById)
    .post("/", contrlContacts.create)
    .patch("/:contactId", contrlContacts.update)
    .delete("/:contactId", contrlContacts.remove);

module.exports = router;
