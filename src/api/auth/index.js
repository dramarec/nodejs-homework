const express = require("express");
const router = express.Router();
const controllerUsers = require("../../controllers/usersCntrl");

router
    .post("/signup", controllerUsers.registration)
    .post("/login", controllerUsers.login)
    .post("/logout", controllerUsers.logout)
    .get("/current", controllerUsers.getCurrentUser)
    .patch("/update", controllerUsers.updateUser);

module.exports = router;
