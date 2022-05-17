import { Flex, Button } from '@chakra-ui/react'
import { ButtonEvent } from '../types'

const availableTimeframe = ['1Min', '15Min', '1Hour', '1Day', '1Week', '1Month']

type Props = {
  onChange: (value: string) => void
  currentTimeframe: string
}

function Timeframe({ onChange, currentTimeframe }: Props) {
  const onClick = (timeframe: string, evt: ButtonEvent) => {
    evt.preventDefault()
    onChange(timeframe)
  }

  return (
    <Flex>
      {availableTimeframe.map((x) => (
        <Button
          key={x}
          colorScheme={currentTimeframe === x ? 'teal' : 'gray'}
          onClick={(evt) => onClick(x, evt)}
        >
          {x}
        </Button>
      ))}
    </Flex>
  )
}

export default Timeframe
