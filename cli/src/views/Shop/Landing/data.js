// import genre images
import gA from "assets/imgs/gA.jpg";
import gB from "assets/imgs/gB.jpg";
import gC from "assets/imgs/gC.jpg";

// import book image
import bookFrt from "assets/imgs/frt.jpg"
import bookBck from "assets/imgs/bck.png"
import book from "assets/imgs/book.jpg"

const benefits = [
  {
    icon: "fas fa-shopping-cart",
    name: "Free Shipping",
    subname: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ante tempor lectus."
  },
  {
    icon: "fas fa-gift",
    name: "Gift Wrapping",
    subname: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ante tempor lectus."
  },
  {
    icon: "fas fa-share-square",
    name: "30-Day Return",
    subname: "Lorem ipsum dolor sit amet, consectetur adipiscing elit ante tempor lectus."
  }
];

const genres = [
  {
    bg: gA,
    col: 5
  },
  {
    bg: gB,
    col: 4
  },
  {
    bg: gC,
    col: 3
  }
]

const recommend = {
  name: "Journey To the center of the Earth",
  author: "Jules Vernes",
  desc: "From advanced selectors to generated content to web fonts, and from gradients, shadows, and rounded corners to elegant animations, CSS3 hold a universe of creative possibilities. No one can better guide you through these galaxies than Dan Cederholm.",
  front: bookFrt,
  back: bookBck
}

const books = [
  {
    img: book,
    name: "Go Set A Watchman",
    author: "Harper Lee",
    price: 105,
    discount: 20
  },
  {
    img: book,
    name: "Brave New World",
    author: "Aldous Huxley",
    price: 105,
    discount: 20
  },
  {
    img: book,
    name: "The Murder Of Roger Ackroyd",
    author: "Agatha Christie",
    price: 105,
    discount: 20
  },
  {
    img: book,
    name: "Wolf Hall",
    author: "Hilary Mantel",
    price: 105,
    discount: 20
  },
]

export {benefits, genres, recommend, books}
