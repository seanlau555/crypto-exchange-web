import { useState } from 'react'
import { Flex, Button } from '@chakra-ui/react'
import { ButtonEvent } from '../types'

const availableTimeframe = ['1Min', '15Min', '1Hour', '1Day', '1Week', '1Month']

type Props = {
  onChange: (value: string) => void
  defaultTimeframe: string
}

function Timeframe({ onChange, defaultTimeframe }: Props) {
  const [timeframe, setTimeframe] = useState(defaultTimeframe)

  const onClick = (value: string, evt: ButtonEvent) => {
    evt.preventDefault()
    setTimeframe(value)
    onChange(value)
  }

  return (
    <Flex>
      {availableTimeframe.map((x) => (
        <Button
          key={x}
          data-testid={x}
          colorScheme={timeframe === x ? 'teal' : 'gray'}
          data-isactive={timeframe === x}
          isActive={timeframe === x}
          onClick={(evt) => onClick(x, evt)}
        >
          {x}
        </Button>
      ))}
    </Flex>
  )
}

export default Timeframe
