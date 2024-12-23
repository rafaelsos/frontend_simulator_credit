import { SelectHTMLAttributes } from 'react'

export interface IInputSelectOptions {
  value: string | number
  label: string
  disabled?: boolean
}

export interface InputSelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string
  label: string
  options: IInputSelectOptions[]
}
