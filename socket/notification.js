function receiveNoti(msg) {
    console.log(msg);
}

module.exports = function(socket) {
    // console.log("connect noti");
    socket.on("send noti", receiveNoti);
}
