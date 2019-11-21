exports.genPassword = async(req, res, next) => {
    try {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 6; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        req.body.password = text;
        return next();
    } catch (e) {
        return next(e);
    }
}
