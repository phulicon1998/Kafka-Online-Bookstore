const genNum = (min, max) => Math.floor((Math.random() * max) + min);

const data = [
  {
    name: "Mystery"
  },
  {
    name: "Fiction"
  },
  {
    name: "Nonfiction"
  },
  {
    name: "Noir"
  },
  {
    name: "Science"
  },
  {
    name: "Animal"
  },
  {
    name: "Psychology"
  },
  {
    name: "Audiobook"
  }
]

export default data.map(v => ({
  ...v,
  discusses: genNum(0, 100),
  soldAmount: genNum(0, 100)
}));
