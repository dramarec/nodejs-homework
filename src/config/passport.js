const passport = require("passport");

const { Strategy, ExtractJwt } = require("passport-jwt");

const { UserService } = require("../services/userSrvs");

require("dotenv").config();
const SECRET_KEY = process.env.JWT_SECRET_KEY;

const params = {
    secretOrKey: SECRET_KEY,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
    new Strategy(params, async (payload, done) => {
        console.log("passport.js => newStrategy => payload =>", payload);

        try {
            const service = new UserService();
            const user = await service.findUserById(payload.id);
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

// const passport = require("passport");

// const { ExtractJWT, Strategy } = require("passport-jwt");

// const User = require("../schemas/user");

// require("dotenv").config();
// const secret = process.env.JWT_SECRET_KEY;

// const params = {
//     secretOrKey: secret,
//     jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
// };

// // JWT Strategy
// passport.use(
//     new Strategy(params, function (payload, done) {
//         console.log('passport.js => newStrategy => payload =>', payload);

//         User.find({ _id: payload.id })
//             .then(([user]) => {
//                 if (!user) {
//                     return done(new Error("User not found"));
//                 }
//                 return done(null, user);
//             })
//             .catch((err) => done(err));
//     })
// );

// const passport = require("passport");

// const { ExtractJWT, Strategy } = require("passport-jwt");

// const User = require("../services/schema/userSchema");

// const dotenv = require("dotenv");
// dotenv.config();
// const { JWT_SECRET_KEY } = process.env;

// const jwtOptions = {
//     secretOrKey: JWT_SECRET_KEY,
//     jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
// };

// passport.use(
//     new Strategy(jwtOptions, async (payload, done) => {
//         console.log("passport.js => newStrategy => payload =>", payload);
//         User.find({ _id: payload.id })
//             .then(([user]) => {
//                 if (!user) {
//                     return done(new Error("User not found"));
//                 }
//                 return done(null, user);
//             })
//             .catch((err) => done(err));
//     })
// );
