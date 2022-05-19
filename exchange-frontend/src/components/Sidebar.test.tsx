import { describe, expect, it } from 'vitest'
import Sidebar from './Sidebar'
import { screen, fireEvent } from '@testing-library/react'
import { createWrapper } from '../test/utils'

describe('<Sidebar />', () => {
  it('render sidebar', () => {
    const { container } = createWrapper(
      <Sidebar selectedTicker={'BTCUSD'} onSelect={() => {}} />,
    )
    expect(container).toMatchSnapshot()
  })

  it('onClick item', () => {
    createWrapper(<Sidebar selectedTicker={'BTCUSD'} onSelect={() => {}} />)
    const btnBitcoin = screen.getByTestId('BTCUSD')
    fireEvent.click(btnBitcoin)
    expect(btnBitcoin.id).toBe('BTCUSD')
  })
})
