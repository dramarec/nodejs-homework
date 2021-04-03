const express = require("express");
const router = express.Router();
const usersCntrl = require("../../controllers/usersCntrl");
// const { validateAuth } = require("../../services/validation/usersVldt");
const guard = require("../../helpers/guard");

router
    .post("/signup", usersCntrl.registration)
    .post("/login", usersCntrl.login)
    .post("/logout", guard, usersCntrl.logout)
    .get("/current", guard, usersCntrl.getCurrentUser)
    .patch("/update", guard, usersCntrl.updateUser);

module.exports = router;
