const genAmount = (forWeek) => Math.floor((Math.random() * (forWeek ? 50 : 200)) + 1)
const genMoney = (forWeek) => Math.floor((Math.random() * (forWeek ? 200 : 1000)) + 100)

const genData = (weekly = true) => [
    {
        name: "To Kill A Mocking Bird",
        author: "Harper Lee",
        soldAmount: genAmount(weekly),
        moneyReceived: genMoney(weekly)
    },
    {
        name: "A Brave New World",
        author: "George Orwell",
        soldAmount: genAmount(weekly),
        moneyReceived: genMoney(weekly)
    },
    {
        name: "Things We Never Said",
        author: "Marc Levy",
        soldAmount: genAmount(weekly),
        moneyReceived: genMoney(weekly)
    },
    {
        name: "Rear Window",
        author: "Cornell Woolrich",
        soldAmount: genAmount(weekly),
        moneyReceived: genMoney(weekly)
    },
    {
        name: "The Subtle Art of Not Giving A Fuck",
        author: "Mark Manson",
        soldAmount: genAmount(weekly),
        moneyReceived: genMoney(weekly)
    },
    {
        name: "The Hollow Man",
        author: "John Dickson Carr",
        soldAmount: genAmount(weekly),
        moneyReceived: genMoney(weekly)
    },
    {
        name: "The Murder of Roger Ackroyd",
        author: "Agatha Christie",
        soldAmount: genAmount(weekly),
        moneyReceived: genMoney(weekly)
    },
    {
        name: "The Adventures of Sherlock Holmes",
        author: "Conan Doyle",
        soldAmount: genAmount(weekly),
        moneyReceived: genMoney(weekly)
    }
]

const data = [
  {name: 'Page A', uv: 4000, price: 2400, amt: 2400},
  {name: 'Page B', uv: 3000, price: 1398, amt: 2210},
  {name: 'Page C', uv: 2000, price: 9800, amt: 2290},
  {name: 'Page D', uv: 2780, price: 3908, amt: 2000},
  {name: 'Page E', uv: 1890, price: 4800, amt: 2181},
  {name: 'Page F', uv: 2390, price: 3800, amt: 2500},
  {name: 'Page G', uv: 3490, price: 4300, amt: 2100},
];

export default genData;
// export default data;
