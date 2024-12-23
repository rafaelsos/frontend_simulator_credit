import { render } from '@testing-library/react'
import React from 'react'

import { HeaderComponent } from '@/presentation/components/Header/HeaderCompoents'

describe('HeaderComponent', () => {
  it('should render the Creditas logo', () => {
    const { getByAltText } = render(<HeaderComponent />)
    const logo = getByAltText('Creditas logomark')

    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('src', '/creditas_logo.svg')
    expect(logo).toHaveAttribute('width', '120')
    expect(logo).toHaveAttribute('height', '26')
  })
})
