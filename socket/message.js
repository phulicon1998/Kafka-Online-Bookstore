module.exports = function(socket) {
    socket.on("create", function(message) {
        console.log(`receive message '${message.text}'`);
        // store on db

        // send back to everyone
        socket.emit("new message", message);
        socket.broadcast.to("a").emit("new message", message);
    });

    socket.on("join", function(conversationName) {
        console.log(`join [${conversationName}]`);
        socket.join(conversationName);
    });
}
