const express = require("express");
const router = express.Router();
const contactsCntrl = require("../../controllers/contactsCntrl");
const {
    validateCreateContact,
    validateUpdateStatusContact,
} = require("../../services/validation/contactsVldt");
const guard = require("../../helpers/guard");

router
    .get("/", guard, contactsCntrl.getAll)
    .get("/:contactId", guard, contactsCntrl.getById)
    .post("/", guard, validateCreateContact, contactsCntrl.create)
    .patch(
        "/:contactId/favorite",
        guard,
        validateUpdateStatusContact,
        contactsCntrl.update
    )
    .delete("/:contactId", guard, contactsCntrl.remove);

module.exports = router;
