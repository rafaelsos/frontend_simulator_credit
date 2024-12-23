import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'

import { InputTextComponent } from '@/presentation/components/InputText/InputTextComponent'

describe('InputTextComponent', () => {
  it('should render the input with the correct label', () => {
    render(<InputTextComponent label="Username" name="username" />)

    const label = screen.getByLabelText('Username')
    expect(label).toBeInTheDocument()

    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('id', 'username')
  })

  it('should accept input value', () => {
    render(<InputTextComponent label="Username" name="username" />)

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'testuser' } })
    expect(input).toHaveValue('testuser')
  })

  it('should call onChange handler when input value changes', () => {
    const handleChange = jest.fn()
    render(
      <InputTextComponent
        label="Username"
        name="username"
        onChange={handleChange}
      />
    )

    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'testuser' } })
    expect(handleChange).toHaveBeenCalledTimes(1)
  })

  it('should render with the correct placeholder', () => {
    render(
      <InputTextComponent
        label="Username"
        name="username"
        placeholder="Enter your username"
      />
    )

    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('placeholder', 'Enter your username')
  })
})
