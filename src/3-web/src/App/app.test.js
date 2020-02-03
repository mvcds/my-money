import React from 'react'
import { render } from '@testing-library/react'
import App from './app.visual'

describe('App component', function () {
  describe('Start', function () {
    it('Shows a loading message', function () {
      const { getByText } = render(<App isLoading />)
      const linkElement = getByText(/loading/i)
      expect(linkElement).toBeInTheDocument()
    })
  })
})
