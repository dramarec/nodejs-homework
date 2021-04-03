const express = require("express");
const router = express.Router();
const usersCntrl = require("../../controllers/usersCntrl");
// const { validateAuth } = require("../../services/validation/usersVldt");
router
    .post("/signup", usersCntrl.registration)
    .post("/login", usersCntrl.login)
    .post("/logout", usersCntrl.logout)
    .get("/current", usersCntrl.getCurrentUser)
    .patch("/update", usersCntrl.updateUser);

module.exports = router;
