
var path = require("path")

module.exports = function (app) {
    app.get("/", function (req, res) {
        return res.sendfile(path.join(__dirname, "/../public/home.html"));
    });
    app.get("/survey", function (req, res) {
        return res.sendfile(path.join(__dirname, "/../public/survey.html"));
    });
    // capture all other routes
    app.get("*", function (req, res) {
        return res.sendfile(path.join(__dirname, "/../public/home.html"));
    });
}

