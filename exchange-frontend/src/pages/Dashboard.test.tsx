import { describe, expect, it } from 'vitest'
import Dashboard from './Dashboard'
// import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'
import { createWrapper } from '../test/utils'

describe('<Dashboard />', () => {
  it('render dashbard page', () => {
    const { container } = createWrapper(<Dashboard />)
    expect(container).toMatchSnapshot()
  })
})
