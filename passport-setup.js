const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
        // normalize profile info we want in req.user
        const email = (profile.emails && profile.emails[0] && profile.emails[0].value) || null;
        const name = profile.displayName || "";
        const id = profile.id;
        const userProfile = { id, email, name, provider: "google" };
        return done(null, userProfile);
    }
));
