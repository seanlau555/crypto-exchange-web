import axios from 'axios'
import { useQuery } from 'react-query'
import Utils from '../utils'
import { Bar } from '../types'

export function useGetCurrencyBars(
  symbol: string,
  timeframe: string,
  token: string,
) {
  return useQuery(
    ['cryptos', symbol, timeframe],
    async () => {
      const start = new Date()
      const end = new Date()
      if (timeframe === '1Min') start.setDate(start.getDate() - 2)
      else if (timeframe === '15Min') start.setDate(start.getDate() - 7)
      else if (timeframe === '1Hour') start.setDate(start.getDate() - 14)
      else start.setFullYear(start.getFullYear() - 1)
      const response = await axios.get(
        // `https://data.alpaca.markets/v2/stocks/${symbol}/bars`,
        `https://data.alpaca.markets/v1beta1/crypto/${symbol}/bars`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            start: start.toISOString(),
            end: end.toISOString(),
            timeframe,
          },
        },
      )
      const parsedData = Utils.parseResponse(response)
      return parsedData
    },
    {
      initialData: [],
      refetchInterval: 1000 * 60,
      refetchOnWindowFocus: false,
    },
  )
}

export function useGetLatestPrice(target: string, base: string) {
  return useQuery(
    ['crypto', target, base],
    async () => {
      const { data } = await axios.get(
        // `https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD`,
        `https://min-api.cryptocompare.com/data/price?fsym=${target}&tsyms=${base}`,
        {
          headers: {
            'Content-type': 'application/json',
          },
        },
      )
      return data ? data[base] : ''
    },
    {
      refetchInterval: 1000 * 60,
      refetchOnWindowFocus: false,
    },
  )
}
