require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

// import handlers
const hdl = require("./handlers");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use((req, res, next) => {
    let err = new Error("Route not found!");
    err.status = 404;
    return next(err);
})

app.use(hdl.Error.handle);

app.listen(process.env.PORT, () => console.log(`[ SERVER IS RUNNING ON PORT ${process.env.PORT} ]`));
