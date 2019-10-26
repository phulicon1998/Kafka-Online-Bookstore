const STATUS = {
    "0": "Working",
    "1": "Transporting",
    "2": "Completed",
    "3": "Cancelled"
}

const statusToString = code => STATUS[code.toString()];

export default statusToString;
