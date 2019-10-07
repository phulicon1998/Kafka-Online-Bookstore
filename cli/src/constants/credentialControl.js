const GUEST_ACCESS_CODE = "004";

const routeType = {
    adminAccess: uCode => allow(uCode, "000"),
    customerAccess: uCode => allow(uCode, "001"),
    salemanAccess: uCode => allow(uCode, "002"),
    managerAccess: uCode => allow(uCode, "003")
}

function allow(uCode, rCode) {
    return uCode === rCode;
}

function getAccess({code = GUEST_ACCESS_CODE} = {}) {
    return function(access) {
        let rs = null;
        for(let i = 0; i < access.length; i++) {
            rs = routeType[access[i]](code);
            if(rs) break;
        }
        return rs;
    }
}

function getDirectPath({code = GUEST_ACCESS_CODE} = {}) {
    if(code === "000" || code === "001") return "/dashboard";
    return "/login";
}

function isPermit({role = GUEST_ACCESS_CODE} = {}){
    let uCode = role;
    return function(vCode) {
        return uCode === vCode;
    }
}

export {getAccess, getDirectPath, isPermit};
