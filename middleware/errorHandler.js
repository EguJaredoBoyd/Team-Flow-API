// Catch errors and send a JSON response
module.exports = (err, req, res, next) => {
    console.error(err.stack); // Log error in console
    res.status(err.status || 500).json({
        message: err.message || "Server Error",
    });
};
