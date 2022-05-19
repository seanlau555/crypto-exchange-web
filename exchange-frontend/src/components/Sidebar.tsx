import { memo } from 'react'
import { Box } from '@chakra-ui/react'
import { DivEvent } from '../types'
import { useGetLatestPrice } from '../services'

const list = ['BTC', 'ETH', 'SOL', 'DOGE', 'AVAX', 'SAND']
const bases = ['USD']

type Props = {
  onSelect: (value: string) => void
  selectedTicker: string
}

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
      fontSize="sm"
    >
      {exchange}, {price}
    </Box>
  )
}

function Sidebar({ selectedTicker, onSelect }: Props) {
  const onClick = (evt: DivEvent) => {
    onSelect(evt.currentTarget.id)
  }
  const currencies = list
    .map((x) => {
      return bases.map((y) => {
        return { current: x, to: y }
      })
    })
    .flat()

  return (
    <>
      <Box
        transition=".4s ease"
        w="300px"
        minW="300px"
        borderColor="gray.100"
        borderRightWidth="1px"
        overflowY="scroll"
        bg="white"
        h="100vh"
      >
        {currencies.map((x: { current: string; to: string }) => (
          <Item
            key={x.current + x.to}
            current={x.current}
            to={x.to}
            selectedTicker={selectedTicker}
            onClick={onClick}
          />
        ))}
      </Box>
    </>
  )
}

export default memo(Sidebar)
