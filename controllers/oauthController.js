const User = require("../models/userModel");
const { signToken } = require("../utils/jwt");

// Passport will set req.user to profile info we pass in passport strategy's verify
exports.googleCallback = async (req, res, next) => {
    try {
        // req.user must include profile info created in passport verify
        const profile = req.user;
        if (!profile || !profile.email) return res.status(400).json({ message: "Google profile missing" });

        // find or create user
        let user = await User.findOne({ email: profile.email });
        if (!user) {
            user = await User.create({
                name: profile.name || profile.displayName,
                email: profile.email,
                provider: "google",
                googleId: profile.id
            });
        } else {
            // update provider info if needed
            if (!user.provider) {
                user.provider = "google";
                user.googleId = profile.id;
                await user.save();
            }
        }

        // issue JWT and redirect or return token
        const token = signToken({ id: user._id });

        // For API: return token in JSON (useful in dev)
        // For OAuth browser flow: redirect to frontend with token as query (or set cookie)
        // We'll return a simple HTML that shows token — you can customize later.
        res.send(`<html><body>
      <h3>Authentication successful</h3>
      <p>Token: <code>${token}</code></p>
      <p>Use this token as <code>Authorization: Bearer &lt;token&gt;</code></p>
    </body></html>`);
    } catch (err) {
        next(err);
    }
};
