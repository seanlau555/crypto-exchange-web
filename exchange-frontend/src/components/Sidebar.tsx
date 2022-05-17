import { memo } from 'react'
import { Box } from '@chakra-ui/react'
import { DivEvent } from '../types'
import { useGetLatestPrice } from '../services'

const list = ['BTCUSD', 'ETHUSD', 'SOLUSD', 'BTCEUR', 'ETHEUR', 'SOLEUR']

type Props = {
  onSelect: (value: string) => void
  selectedTicker: string
}

function Item({
  currency,
  selectedTicker,
  onClick,
}: {
  currency: string
  selectedTicker: string
  onClick: (evt: DivEvent) => void
}) {
  const base = currency.slice(3, 6)
  const { data } = useGetLatestPrice(currency.slice(0, 3), currency.slice(3, 6))
  const price = `Price: ${base} ${data}`

  return (
    <Box
      display="block"
      cursor="pointer"
      padding="4px 16px"
      borderWidth="2px"
      borderColor={selectedTicker === currency ? 'teal.100' : 'white'}
      fontWeight={selectedTicker === currency ? '600' : '500'}
      background={selectedTicker === currency ? 'teal.50' : 'white'}
      color={selectedTicker === currency ? 'teal.700' : 'gray.700'}
      borderRadius="0px"
      onClick={onClick}
      id={currency}
      fontSize="sm"
    >
      {currency}, {price}
    </Box>
  )
}

function Sidebar({ selectedTicker, onSelect }: Props) {
  const onClick = (evt: DivEvent) => {
    onSelect(evt.currentTarget.id)
  }

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
        {list.map((x: string) => (
          <Item
            key={x}
            currency={x}
            selectedTicker={selectedTicker}
            onClick={onClick}
          />
        ))}
      </Box>
    </>
  )
}

export default memo(Sidebar)
