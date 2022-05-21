import { describe, expect, it } from 'vitest'
import Item from '../Item'
import { createWrapper } from '../../test/utils'

describe('<Item />', () => {
  it('render item', () => {
    const { container } = createWrapper(
      <Item
        current={'BTC'}
        to={'USD'}
        selectedTicker={'BTCUSD'}
        onClick={() => {}}
      />,
    )
    expect(container).toBeInTheDocument()
  })
})
