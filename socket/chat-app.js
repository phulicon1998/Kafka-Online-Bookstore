module.exports = function(socket) {
    socket.on("control chat app", function() {
        socket.join("chatApp");
    })

    socket.on("select waiter", function(waiter) {
        socket.to("chatApp").emit("remove waiter", waiter);
    })

    socket.on("leave handler", function(handler) {
        socket.emit("new waiter", handler);
        socket.to("chatApp").emit("new waiter", handler);
    })
}
