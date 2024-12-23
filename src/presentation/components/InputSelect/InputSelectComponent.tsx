import { InputSelectProps } from './InputSelectComponent.types'

export const InputSelectComponent = ({
  label,
  name,
  options,
  ...rest
}: InputSelectProps) => {
  return (
    <>
      <label htmlFor={name} className="text-sm/6 font-medium text-gray-700">
        {label}
      </label>
      <select
        className="p-2 rounded-md border border-gray-300 text-gray-700 bg-gray-300"
        id={name}
        {...rest}
      >
        {options.map(({ value, label, disabled }) => (
          <option key={value} value={value} disabled={disabled}>
            {label}
          </option>
        ))}
      </select>
    </>
  )
}
