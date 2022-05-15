import React from 'react'
import axios from 'axios'
import { useQuery, useQueryClient } from 'react-query'
import Utils from '../Utils'
// import Alpaca from '@alpacahq/alpaca-trade-api'

// const alpaca = new Alpaca({
//   keyId: import.meta.env.VITE_REACT_APP_CLIENT_ID,
//   secretKey: import.meta.env.VITE_REACT_APP_CLIENT_SECRET,
//   paper: true,
// })

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
      const response = await axios.get(
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
      const parsedData = Utils.parseResponse(response)
      return parsedData
    },
    {
      initialData: [],
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

export const useGetCurrencySubscription = (symbol, token) => {
  const queryClient = useQueryClient()

  React.useEffect(() => {
    // const websocket = alpaca.data_stream_v2
    const websocket = new WebSocket(
      `wss://stream.data.alpaca.markets/v1beta1/crypto`,
    )
    websocket.onopen = () => {
      console.log('connected')
      const authMessage = {
        action: 'auth',
        key: import.meta.env.VITE_REACT_APP_CLIENT_ID,
        secret: import.meta.env.VITE_REACT_APP_CLIENT_SECRET,
      }
      console.log(authMessage)
      websocket.send(JSON.stringify(authMessage))

      const message = {
        action: 'subscribe',
        trades: ['BTCUSD'],
        quotes: ['BTCUSD', 'LTCUSD'],
        bars: ['*'],
      }
      // websocket.send(JSON.stringify(message))
      // socket.subscribeForQuotes(['AAPL'])
    }
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      console.log(data)
      // queryClient.setQueriesData(data.entity, (oldData) => {
      //   const update = (entity) =>
      //     entity.id === data.id ? { ...entity, ...data.payload } : entity
      //   return Array.isArray(oldData) ? oldData.map(update) : update(oldData)
      // })
    }

    return () => {
      // websocket.disconnect()
      websocket.close()
    }
  }, [queryClient])
}
