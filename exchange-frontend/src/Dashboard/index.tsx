import { useState } from 'react'
import CandleStickChart from './Chart'
import Timeframe from './Timeframe'
import Utils from '../Utils'
import { Flex, Button, Input } from '@chakra-ui/react'
import Sidebar from './Sidebar'
import styled from '@emotion/styled'
import { InputEvent } from '../types'
import { useGetCurrencyBars, useGetCurrencySubscription } from '../services'

function Dashboard() {
  const [inputValue, setInputValue] = useState<string>('')
  const [symbol, setSymbol] = useState<string>('BTCUSD')
  const [timeframe, setTimeframe] = useState<string>('1Day')
  const token = window.localStorage.getItem('auth-token') || ''
  const { data } = useGetCurrencyBars(symbol, timeframe, token)

  useGetCurrencySubscription(symbol, token)

  const handleChange = (evt: InputEvent) => {
    setInputValue(evt.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (window.localStorage.getItem('auth-token') === null) {
      var oauth_code = new URLSearchParams(window.location.search).get('code')
      const auth_token = await Utils.getAuthToken(oauth_code)
      window.localStorage.setItem('auth-token', auth_token)
    }
    setSymbol(inputValue)
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
