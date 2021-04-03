const express = require("express");
const router = express.Router();
const usersCntrl = require("../../controllers/usersCntrl");
const {
    authVldt,
    updateUserVldt,
} = require("../../services/validation/usersVldt");

const guard = require("../../helpers/guard");

router
    .post("/signup", authVldt, usersCntrl.registration)
    .post("/login", authVldt, usersCntrl.login)
    .post("/logout", guard, usersCntrl.logout)
    .get("/current", guard, usersCntrl.getCurrentUser)
    .patch("/update", guard, updateUserVldt, usersCntrl.updateUser);

module.exports = router;
