const messageIO = require("./message");
const chatAppIO = require("./chat-app");

module.exports = function(io) {
    var activeUsers = [];

    io.on("connection", function(socket) {

        socket.on("register user", function(user) {
            if(Object.keys(user).length > 0) {
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
            try {
                let offlineUser = activeUsers.filter(u => u.socket_id === socket.id)[0];
                if(offlineUser) console.log(`[ ${offlineUser.username} is offline ]`);
                activeUsers = activeUsers.filter(u => u.socket_id !== socket.id)
            } catch (e) {
                console.log(e);
            }
        })
    })
}
