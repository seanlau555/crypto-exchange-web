import { describe, expect, it } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Timeframe from '../Timeframe'

describe('Timeframe', () => {
  it('should render list of button', () => {
    render(<Timeframe defaultTimeframe="1Min" onChange={() => {}} />)
    const buttonElements = screen.getAllByRole('button')
    expect(buttonElements.length).toBe(6)
  })

  it('should render active button', () => {
    render(<Timeframe defaultTimeframe={'1Day'} onChange={() => {}} />)
    const buttonElement = screen.getByRole('button', { name: '1Day' })
    expect(buttonElement.getAttribute('data-isactive')).toBe('true')
  })

  it('able to click button', async () => {
    render(<Timeframe defaultTimeframe={'1Min'} onChange={() => {}} />)
    const buttonElement = screen.getByRole('button', { name: /1Day/i })
    fireEvent.click(buttonElement)
    expect(buttonElement.getAttribute('data-isactive')).toBe('true')
  })
})
