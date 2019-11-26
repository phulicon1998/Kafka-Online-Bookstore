export const ADMIN_PERMISSION = "000";
export const CUSTOMER_PERMISSION = "001";
export const SALESTAFF_PERMISSION = "002";
export const MANAGER_PERMISSION = "003";
export const GUEST_PERMISSION = {code: "004"};

// Secondary permission
export const PROVIDER_PERMISSION = "005";

export function isPermit(roles = [GUEST_PERMISSION]){
    let uCode = roles.map(v => v.code);
    return function(vCode) {
        return uCode.indexOf(vCode) !== -1;
    }
}
