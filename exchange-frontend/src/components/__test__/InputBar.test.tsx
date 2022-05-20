import { describe, expect, it } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import InputBar from '../InputBar'

describe('InputBar', () => {
  it('should render input element', () => {
    render(<InputBar onSubmit={() => {}} />)
    const inputElement = screen.getByPlaceholderText(/Input ticker.../i)
    expect(inputElement).toBeInTheDocument()
  })

  it('should be able to type in input', () => {
    render(<InputBar onSubmit={() => {}} />)
    const inputElement = screen.getByPlaceholderText(/Input ticker.../i)
    fireEvent.change(inputElement, { target: { value: 'BTCUSD' } })
    expect(inputElement.value).toBe('BTCUSD')
  })

  it('should value submit when submit button is clicked', () => {
    render(<InputBar onSubmit={() => {}} />)
    const inputElement = screen.getByPlaceholderText(/Input ticker.../i)
    const buttonElement = screen.getByRole('button', { name: /Submit/i })
    fireEvent.change(inputElement, { target: { value: 'BTCUSD' } })
    fireEvent.click(buttonElement)
  })
})
