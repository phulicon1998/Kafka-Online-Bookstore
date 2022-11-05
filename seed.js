require('dotenv').config()
const db = require("./models");

const roles = [
    {
        type: "ADMIN PERMISSION",
        code: "000"
    },
    {
        type: "CUSTOMER PERMISSION",
        code: "001"
    },
    {
        type: "SALESTAFF PERMISSION",
        code: "002"
    },
    {
        type: "MANAGER PERMISSION",
        code: "003"
    },
    {
        type: "PROVIDER PERMISSION",
        code: "005"
    }
];

const owner = {
    email: "phulicon815490@gmail.com",
    password: "admin",
    username: "admin",
    active: true
}

async function createRole(){
    try {
        let list = await db.Role.find();
        if(list.length === 0){
            for(let role of roles){
                await db.Role.create(role);
            }
            return console.log("[ ROLE CREATED ]");
        }
        return console.log("[ ROLE LOADED ]");
    } catch(err) {
        console.log(err);
    }
}

async function createOwner() {
    try {
        let role = await db.Role.findOne({code: "000"});
        let noOwner = (await db.UserRole.find({role_id: role._id})).length === 0;
        if(noOwner) {
            let user = await db.User.create(owner);
            await db.UserRole.create({role_id: role._id, user_id: user._id});
            return console.log("[ OWNER CREATED ]");
        }
        return console.log("[ OWNER LOADED ]");
    } catch(err) {
        console.log(err);
    }
}

createRole().then(() => createOwner());
