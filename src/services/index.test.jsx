import { renderHook } from '@testing-library/react-hooks'
import { useGetLatestPrice, useGetCurrencyBars } from './index'

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

test('get currency bars', async () => {
  const { result, waitFor } = renderHook(
    () => useGetCurrencyBars('BTCUSD', '1Hour', 'token'),
    {
      wrapper,
    },
  )

  await waitFor(() => result.current.isSuccess)
})

test('get latest price', async () => {
  const { result, waitFor } = renderHook(
    () => useGetLatestPrice('BTC', 'USD'),
    {
      wrapper,
    },
  )

  await waitFor(() => result.current.isSuccess)
})
