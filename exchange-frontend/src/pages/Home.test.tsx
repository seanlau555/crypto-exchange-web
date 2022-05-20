import { describe, expect, it } from 'vitest'
import Home from './Home'
import { screen, render, fireEvent } from '@testing-library/react'

describe('<Home />', () => {
  it('render home page', () => {
    const { container } = render(<Home />)
    expect(container).toHaveTextContent('My OAuth Trading App')
  })

  it('should able to click submit button', () => {
    render(<Home />)
    const buttonElement = screen.getByRole('button', {
      name: /Sign in with Alpaca/i,
    })
    fireEvent.click(buttonElement)
    expect(window.location.href).toEqual('http://localhost:3000/')
  })
})
