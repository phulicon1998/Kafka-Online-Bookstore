var mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = Promise;

module.exports.Author = require("./m-author");
module.exports.Genre = require("./m-genre");
module.exports.Book	= require("./m-book");
module.exports.BookMore	= require("./m-book-more");
module.exports.BookImage = require("./m-book-image");
module.exports.Edition = require("./m-edition");
module.exports.Review = require("./m-review");
module.exports.Order = require("./m-order");
module.exports.OrderBook = require("./m-order-book");
module.exports.Provider = require("./m-provider");
module.exports.Publisher = require("./m-publisher");
module.exports.Address = require("./m-shipment");
// module.exports.User = require("./user");
