import React from 'react'
import { render } from '@testing-library/react'
import App from './app.visual'

describe('App component', function () {
  it('renders learn react link', function () {
    const { getByText } = render(<App />)
    const linkElement = getByText(/learn react/i)
    expect(linkElement).toBeInTheDocument()
  })
})
