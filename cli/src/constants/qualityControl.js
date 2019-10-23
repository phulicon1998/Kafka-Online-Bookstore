// QUALITY CONTROLS
export const quality = {
    BRAND_NEW: 1,
    LIKE_NEW: 2,
    GOOD: 3,
    ACCEPTABLE: 4
}

export function qualityToString(q) {
    switch(q) {
        case quality.BRAND_NEW:
            return "Brand New";
        case quality.LIKE_NEW:
            return "Like New";
        case quality.GOOD:
            return "Good";
        default:
            return "Acceptable";
    }
}
