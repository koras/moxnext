//import ky from 'ky-universal'
import { useQuery,useQueries } from 'react-query'

const fetchInstruments = async (limit = 10) => {
    const parsed =  await fetch('https://jsonplaceholder.typicode.com2/posts')
  .then(data => {  
    return data.json();
  }) 
  .catch(err => {
    console.log(err);
  });

  return parsed;
  return parsed.filter((x) => x.id <= limit)
}


const getInstrument = (ticker) => {
  const event = instruments.filter((item) => {
    return item.ticker === ticker;
  });
  return event[0];
}

const getInstruments = (limit) => {
  return useQuery({
    queryKey: ['instruments', limit],
    //    queryFn: ()=> fetchInstruments(limit),
   queryFn: ()=> instruments, 
  })
}

const instruments = [
  {
    instrumentId: 1,
    name: "Биткоин",
    type: "crypto",
    ticker: "btc",
    description:
      "«Газпром» — крупнейший в России производитель и экспортёр сжиженного природного газа (СПГ). ",
    price: 130,
    images: {
      logo: "https://img.freepik.com/premium-vector/vector-illustration-large-bitcoin-coin_541404-125.jpg?w=360",
    },
    change: "-10",
    currency: "$",
  },
  {
    instrumentId:   5,
    name: "Газпром",
    type: "crypto",
    images: {
      logo: "https://logodix.com/logo/2103877.png",
    },
    description:
      "«Газпром» — крупнейший в России производитель и экспортёр сжиженного природного газа (СПГ). ",
    ticker: "gazp",
    price: 160,
    change: "-20",
    currency: "$",
  },
  {
    instrumentId:   4,
    name: "Газпром",
    type: "crypto",
    images: {
      logo: "https://img.freepik.com/premium-vector/vector-illustration-large-bitcoin-coin_541404-125.jpg?w=360",
    },
    description:
      "«Газпром» — крупнейший в России производитель и экспортёр сжиженного природного газа (СПГ). ",
    ticker: "gazp",
    price: 160,
    change: "20",
    currency: "$",
  },
  {
    instrumentId:   22,
    name: "Газпром",
    type: "crypto",
    images: {
      logo: "https://logodix.com/logo/2103877.png",
    },
    description:
      "«Газпром» — крупнейший в России производитель и экспортёр сжиженного природного газа (СПГ). ",
    ticker: "gazp",
    price: 160,
    change: "-20",
    currency: "$",
  },
  {
    instrumentId:   446,
    name: "Газпром",
    type: "crypto",
    images: {
      logo: "https://img.freepik.com/premium-vector/vector-illustration-large-bitcoin-coin_541404-125.jpg?w=360",
    },
    description:
      "«Газпром» — крупнейший в России производитель и экспортёр сжиженного природного газа (СПГ). ",
    ticker: "gazp",
    price: 160,
    change: "20",
    currency: "$",
  },
  {
    instrumentId:   123,
    name: "Газпром",
    type: "crypto",
    images: {
      logo: "https://img.freepik.com/premium-vector/vector-illustration-large-bitcoin-coin_541404-125.jpg?w=360",
    },
    description:
      "«Газпром» — крупнейший в России производитель и экспортёр сжиженного природного газа (СПГ). ",
    ticker: "gazp",
    price: 160,
    change: "20",
    currency: "$",
  },
  {
    instrumentId:  34576,
    name: "Газпром",
    type: "crypto",
    images: {
      logo: "https://img.freepik.com/premium-vector/vector-illustration-large-bitcoin-coin_541404-125.jpg?w=360",
    },
    description:
      "«Газпром» — крупнейший в России производитель и экспортёр сжиженного природного газа (СПГ). ",
    ticker: "gazp",
    price: 160,
    change: "-20",
    currency: "$",
  },
  {
    instrumentId:  12363,
    name: "Газпром",
    type: "crypto",
    images: {
      logo: "https://img.freepik.com/premium-vector/vector-illustration-large-bitcoin-coin_541404-125.jpg?w=360",
    },
    description:
      "«Газпром» — крупнейший в России производитель и экспортёр сжиженного природного газа (СПГ). ",
    ticker: "gazp",
    price: 160,
    change: "-20",
    currency: "$",
  },
];
export { getInstruments, getInstrument, fetchInstruments }
