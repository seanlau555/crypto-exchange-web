import React, { useEffect, useState } from 'react'
import CandleStickChart from './Chart'
import Timeframe from './Timeframe'
import axios from 'axios'
import Utils from '../Utils'
import initialData from './Chart/initial-data.json'
import { Flex, Button, Input } from '@chakra-ui/react'
import Sidebar from './Sidebar'
import styled from '@emotion/styled'
import { InputEvent } from '../types'
import { useGetCurrencyBars } from '../services'

function Dashboard() {
  const [inputValue, setInputValue] = useState<string>('')
  const [symbol, setSymbol] = useState<string>('BTCUSD')
  const [timeframe, setTimeframe] = useState<string>('1Day')
  const [chartData, setChartData] = useState(initialData)
  const token = window.localStorage.getItem('auth-token') || ''
  const { data } = useGetCurrencyBars(symbol, timeframe, token)

  // useEffect(() => {
  //   getBars(window.localStorage.getItem('auth-token'))
  // }, [symbol, timeframe])

  const handleChange = (evt: InputEvent) => {
    setInputValue(evt.target.value)
  }

  const getBars = async (_auth_token: { _auth_token: string }) => {
    var start = new Date()
    start.setFullYear(start.getFullYear() - 1)

    const response = await axios.get(
      // `https://data.alpaca.markets/v2/stocks/${symbol}/bars`,
      `https://data.alpaca.markets/v1beta1/crypto/${symbol}/bars`,
      {
        headers: {
          Authorization: `Bearer ${_auth_token}`,
        },
        params: {
          start: start.toISOString(),
          // end: end.toISOString(),
          timeframe,
        },
      },
    )

    if (response.data.bars === null) {
      return
    }

    const parsedData = Utils.parseResponse(response)
    setChartData(parsedData)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (window.localStorage.getItem('auth-token') === null) {
      var oauth_code = new URLSearchParams(window.location.search).get('code')
      const auth_token = await Utils.getAuthToken(oauth_code)
      window.localStorage.setItem('auth-token', auth_token)
    }
    setSymbol(inputValue)
    getBars(window.localStorage.getItem('auth-token'))
  }

  const onChangeTimeframe = (value: string) => {
    setTimeframe(value)
  }

  return (
    <Flex bg="#fef7d0" height="100vh">
      <Sidebar selectedTicker={symbol} onSelect={setSymbol} />
      <div>
        <Flex>
          <StyledForm onSubmit={handleSubmit}>
            <label>
              Symbol:
              <Input
                bg="white"
                textTransform="uppercase"
                type="text"
                onChange={handleChange}
              />
            </label>
            <Button type="submit" colorScheme="teal" ml="8px">
              Submit
            </Button>
          </StyledForm>
          <Timeframe
            currentTimeframe={timeframe}
            onChange={onChangeTimeframe}
          />
        </Flex>
        <div className="chart">
          <label className="chart-symbol">
            Current Symbol: <b> {symbol.toUpperCase()} </b>{' '}
          </label>
          <CandleStickChart data={data} />
        </div>
      </div>
    </Flex>
  )
}

export default Dashboard

const StyledForm = styled.form`
  display: flex;
  width: 400px;
  label {
    display: flex;
    align-items: center;
    input {
      margin-left: 8px;
    }
  }
`
