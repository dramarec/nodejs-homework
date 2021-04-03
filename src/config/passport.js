const passport = require("passport");

const { ExtractJWT, Strategy } = require("passport-jwt");

const User = require("../services/schema/userSchema");

const dotenv = require("dotenv");
dotenv.config();
const { JWT_SECRET_KEY } = process.env;

const jwtOptions = {
    secretOrKey: JWT_SECRET_KEY,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
    new Strategy(jwtOptions, async (payload, done) => {
        console.log("passport.js => newStrategy => payload =>", payload);
        User.find({ _id: payload.id })
            .then(([user]) => {
                if (!user) {
                    return done(new Error("User not found"));
                }
                return done(null, user);
            })
            .catch((err) => done(err));
    })
);
