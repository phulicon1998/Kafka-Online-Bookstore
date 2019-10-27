const STATUS = {
    "0": "Working",
    "1": "Transporting",
    "2": "Completed",
    "3": "Cancelled"
}

export const state = {
    WORKING: 0,
    TRANSPORTING: 1,
    COMPLETED: 2,
    CANCELLED: 3
}

const statusToString = code => STATUS[code.toString()];

export default statusToString;
