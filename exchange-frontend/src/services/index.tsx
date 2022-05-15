import axios from 'axios'
import { useQuery } from 'react-query'

export function useGetCurrencyBars(
  symbol: string,
  timeframe: string,
  token: string,
) {
  return useQuery(
    ['cryptos', symbol, timeframe],
    async () => {
      var start = new Date()
      start.setFullYear(start.getFullYear() - 1)
      const { data } = await axios.get(
        // `https://data.alpaca.markets/v2/stocks/${symbol}/bars`,
        `https://data.alpaca.markets/v1beta1/crypto/${symbol}/bars`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            start: start.toISOString(),
            // end: end.toISOString(),
            timeframe,
          },
        },
      )
      return data
    },
    {
      refetchOnWindowFocus: false,
    },
  )
}

export function useGetLatestPrice(target: string, base: string) {
  return useQuery(
    ['crypto', target, base],
    async () => {
      const { data } = await axios.get(
        `https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD`,
        // `https://min-api.cryptocompare.com/data/price?fsym=${target}&tsyms=${base}`,
        {
          headers: {
            'Content-type': 'application/json',
          },
        },
      )
      return data ? data[base] : ''
    },
    {
      refetchOnWindowFocus: true,
    },
  )
}
