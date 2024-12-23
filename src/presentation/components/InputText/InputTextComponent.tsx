import { InputTextProps } from './InputTextComponent.types'

export const InputTextComponent = ({
  label,
  name,
  ...rest
}: InputTextProps) => {
  return (
    <>
      <label
        htmlFor={name}
        className="block text-sm/6 font-medium text-gray-700"
      >
        {label}
      </label>
      <input
        className="p-2 rounded-md border text-gray-700 border-gray-300 bg-gray-300"
        id={name}
        {...rest}
      />
    </>
  )
}
