import { useEffect, useState } from 'react'
import CandleStickChart from '../components/Chart'
import Timeframe from '../components/Timeframe'
import Utils from '../utils'
import { Flex } from '@chakra-ui/react'
import Sidebar from '../components/Sidebar'
import InputBar from '../components/InputBar'
import { useGetCurrencyBars } from '../services'
import { useNavigate } from 'react-router-dom'

const defaultTimeframe = '1Day'

function Dashboard() {
  const [symbol, setSymbol] = useState<string>('')
  const [timeframe, setTimeframe] = useState<string>(defaultTimeframe)
  const token = window.localStorage.getItem('auth-token') || ''
  const { data, refetch } = useGetCurrencyBars(symbol, timeframe, token)
  const navigate = useNavigate()

  useEffect(() => {
    async function getToken() {
      if (window.localStorage.getItem('auth-token') === null) {
        const oauth_code = new URLSearchParams(window.location.search).get(
          'code',
        )
        if (oauth_code) {
          const auth_token = await Utils.getAuthToken(oauth_code)
          window.localStorage.setItem('auth-token', auth_token)
          refetch()
        } else {
          navigate('/')
        }
      }
    }
    getToken()
  }, [])

  const handleSubmit = (value: string) => {
    setSymbol(value)
  }

  const onChangeTimeframe = (value: string) => {
    setTimeframe(value)
  }

  return (
    <Flex height="100vh">
      <Sidebar selectedTicker={symbol} onSelect={setSymbol} />
      <div>
        <Flex>
          <InputBar onSubmit={handleSubmit} />
          <Timeframe
            defaultTimeframe={defaultTimeframe}
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
