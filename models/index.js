var mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
mongoose.Promise = Promise;

module.exports.Author = require("./author");
module.exports.Genre = require("./genre");
module.exports.Book	= require("./book");
module.exports.BookMore	= require("./book-more");
module.exports.BookImage = require("./book-image");
module.exports.Edition = require("./edition");
module.exports.Review = require("./review");
module.exports.Order = require("./order");
module.exports.OrderBook = require("./order-book");
module.exports.Provider = require("./provider");
module.exports.Publisher = require("./publisher");
module.exports.Address = require("./address");
// module.exports.User = require("./user");
