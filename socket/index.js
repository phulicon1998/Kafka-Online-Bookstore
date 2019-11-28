const messageIO = require("./message");
const chatAppIO = require("./chat-app");

module.exports = function(io) {
    var activeUsers = [];

    io.on("connection", function(socket) {

        socket.on("register user", function(user) {
            if(user) {
                activeUsers.push({
                    socket_id: socket.id,
                    user_id: user._id,
                    username: user.username
                })
            }
        })

        messageIO(socket);
        chatAppIO(socket);

        socket.on("disconnect", function() {
            let offlineUser = activeUsers.filter(u => u.socket_id === socket.id)[0];
            activeUsers = activeUsers.filter(u => u.socket_id !== socket.id)
            if(offlineUser) console.log(`[ ${offlineUser.username} is offline ]`);
        })
    })
}
