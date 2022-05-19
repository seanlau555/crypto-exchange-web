import { DivEvent } from '../types'
import { useGetLatestPrice } from '../services'
import { Box } from '@chakra-ui/react'

function Item({
  current,
  to,
  selectedTicker,
  onClick,
}: {
  current: string
  to: string
  selectedTicker: string
  onClick: (evt: DivEvent) => void
}) {
  const { data } = useGetLatestPrice(current, to)
  const price = `Price: ${to} ${data}`
  const exchange = current + to

  return (
    <Box
      display="block"
      cursor="pointer"
      padding="4px 16px"
      borderWidth="2px"
      borderColor={selectedTicker === exchange ? 'teal.100' : 'white'}
      fontWeight={selectedTicker === exchange ? '600' : '500'}
      background={selectedTicker === exchange ? 'teal.50' : 'white'}
      color={selectedTicker === exchange ? 'teal.700' : 'gray.700'}
      borderRadius="0px"
      onClick={onClick}
      id={exchange}
      data-testid={exchange}
      fontSize="sm"
    >
      {exchange}, {price}
    </Box>
  )
}
export default Item
