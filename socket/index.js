const messageIO = require("./message");
const notificationIO = require("./notification");

module.exports = function(io) {
    io.on("connection", messageIO);
    io.on("connection", notificationIO);
}
