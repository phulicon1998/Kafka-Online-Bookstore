require("dotenv").config();
const app = require("express")();
const bodyParser = require("body-parser");
const cors = require("cors");
const hdl = require("./handlers");

const server = require("http").createServer(app);
const io = require("socket.io")(server);
require("./socket")(io);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use("/api/genres", require("./routes/r-genre"));
app.use("/api/authors", require("./routes/r-author"));
app.use("/api/publishers", require("./routes/r-publisher"));
app.use("/api/providers", require("./routes/r-provider"));
app.use("/api/user", require("./routes/r-user"));
app.use("/api/books", require("./routes/r-book"));
app.use("/api/editions", require("./routes/r-edition"));
app.use("/api/orders", require("./routes/r-order"));
app.use("/api/messages", require("./routes/r-message"));

app.use((req, res, next) => {
    let err = new Error("Route not found!");
    err.status = 404;
    return next(err);
})

app.use(hdl.Error.handle);

server.listen(process.env.PORT, async() => {
    console.log(`[ SERVER IS RUNNING ON PORT ${process.env.PORT} ]`)
});
