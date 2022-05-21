import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from 'react-query'

export const createWrapper = (ui: any) => {
  const queryClient = new QueryClient()
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  )
}
