function receiveMsg(msg) {
    console.log(msg);
}

module.exports = function(socket) {
    // console.log("connect msg");
    socket.on("send msg", receiveMsg);
}
