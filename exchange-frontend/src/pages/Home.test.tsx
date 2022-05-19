import { describe, expect, it } from 'vitest'
import Home, { alpacaAuthUrl } from './Home'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<Home />', () => {
  it('render home page', () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot()
  })

  // it('click sign in button', () => {
  //   render(<Home />)
  //   userEvent.click(screen.getByTestId('signin'))
  //   expect(document.location.href).toEqual(alpacaAuthUrl)
  // })
})
