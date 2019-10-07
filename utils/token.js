const jwt = require("jsonwebtoken");

function genToken(_id, role = false) {
    return jwt.sign({_id, role}, process.env.SECRET);
}

async function getRoleFromToken(header) {
    let token = header.split(" ")[1];
    return await jwt.verify(token, process.env.SECRET).roles[0].code;
}

module.exports = {genToken, getRoleFromToken};
