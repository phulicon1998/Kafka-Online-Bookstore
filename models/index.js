var mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
mongoose.Promise = Promise;

module.exports.User = require("./user");
module.exports.Book	= require("./book");
module.exports.Cart	= require("./cart");
module.exports.Author = require("./author");
module.exports.Comment = require("./comment");
module.exports.BookGenre = require("./book-genre");
module.exports.Genre = require("./genre");
module.exports.Supplier = require("./supplier");
module.exports.Publisher = require("./publisher");
module.exports.Order = require("./order");
module.exports.OrderBook = require("./order-book");
module.exports.Address = require("./address");
module.exports.BookImage = require("./book-image");
