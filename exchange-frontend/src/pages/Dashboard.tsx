import { useState } from 'react'
import CandleStickChart from '../components/Chart'
import Timeframe from '../components/Timeframe'
import Utils from '../utils'
import { Flex, Button, Input } from '@chakra-ui/react'
import Sidebar from '../components/Sidebar'
import styled from '@emotion/styled'
import { InputEvent, FormEvent } from '../types'
import { useGetCurrencyBars } from '../services'

function Dashboard() {
  const [inputValue, setInputValue] = useState<string>('')
  const [symbol, setSymbol] = useState<string>('BTCUSD')
  const [timeframe, setTimeframe] = useState<string>('1Day')
  const token = window.localStorage.getItem('auth-token') || ''
  const { data } = useGetCurrencyBars(symbol, timeframe, token)

  const handleChange = (evt: InputEvent) => {
    setInputValue(evt.target.value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSymbol(inputValue)
  }

  const onChangeTimeframe = (value: string) => {
    setTimeframe(value)
  }

  return (
    <Flex height="100vh">
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
        {data && (
          <div className="chart">
            <label className="chart-symbol">
              Current Symbol: <b> {symbol.toUpperCase()} </b>{' '}
            </label>
            <CandleStickChart inputData={data} />
          </div>
        )}
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
