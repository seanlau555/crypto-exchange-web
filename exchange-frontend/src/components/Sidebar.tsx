import { memo } from 'react'
import { Box } from '@chakra-ui/react'
import { DivEvent } from '../types'
import Item from './Item'

const list = ['BTC', 'ETH', 'SOL', 'DOGE', 'AVAX', 'SAND']
const bases = ['USD']

type Props = {
  onSelect: (value: string) => void
  selectedTicker: string
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
        {selectedTicker &&
          currencies.map((x: { current: string; to: string }) => (
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
