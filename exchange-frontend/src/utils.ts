import axios, { AxiosResponse } from 'axios'
import { Bar } from './types'

const Utils = {
  async getAuthToken(oauth_code: string) {
    // returns Authorization Token once we have our OAuth token
    const body = {
      grant_type: 'authorization_code',
      code: oauth_code,
      client_id: import.meta.env.VITE_REACT_APP_CLIENT_ID,
      client_secret: import.meta.env.VITE_REACT_APP_CLIENT_SECRET,
      redirect_uri: import.meta.env.VITE_REACT_APP_REDIRECT_URI,
    }
    // encode data into form encoding
    const encodedBody = Object.keys(body)
      .map((key: string) => `${key}=${encodeURIComponent(body[key])}`)
      .join('&')
    console.log(body)
    // submit POST request
    const response = await axios({
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      url: 'https://api.alpaca.markets/oauth/token',
      data: encodedBody,
    })

    const { data } = response
    window.localStorage.setItem('auth-token', data)
    return data.access_token
  },

  parseResponse(response: AxiosResponse): Array<Bar> | [] {
    const { bars } = response.data
    if (bars) {
      const data = []
      for (let i = 0; i < bars.length; i++) {
        const bar = bars[i]
        const point = {
          date: bar.t,
          open: bar.o,
          low: bar.l,
          high: bar.h,
          close: bar.c,
          volume: bar.v,
        }
        data.push(point)
      }
      return data
    }
    return []
  },
}
export default Utils
