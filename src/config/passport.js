const passport = require("passport");

const { Strategy, ExtractJwt } = require("passport-jwt");

const UserService = require("../services/userSrvs");

require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const params = {
    secretOrKey: SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
    new Strategy(params, async (payload, done) => {
        // console.log("passport.js => newStrategy => payload =>", payload);

        try {
            const user = await UserService.findUserById(payload.id);
            console.log("passport.js => newStrategy => user =>", user);

            if (!user) {
                return done(new Error("User not found"));
            }
            if (!user.token) {
                return done(null, false);
            }
            return done(null, user);
        } catch (err) {
            done(err);
        }
    })
);
