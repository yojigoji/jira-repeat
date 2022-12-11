import { debounce } from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Input } from '.'
import { InputProps } from './Input/type'

interface InputDebouncedProps {
  onChange: (value: string) => void
  value?: string | number
}

const InputDebounced = ({
  onChange,
  value: propsValue,
  ...inputProps
}: InputDebouncedProps & Omit<InputProps, 'onChange'>) => {
  const [value, setValue] = useState(propsValue)
  const isControlled = propsValue !== undefined

  const handleChange = useCallback(
    debounce((newValue) => onChange(newValue), 500),
    []
  )

  const valueRef = useRef(value)
  valueRef.current = value

  useEffect(() => {
    if (propsValue !== valueRef.current) {
      setValue(propsValue)
    }
  }, [propsValue])

  return (
    <Input
      {...inputProps}
      value={isControlled ? value : undefined}
      onChange={(newValue) => {
        setValue(newValue)
        handleChange(newValue)
      }}
    />
  )
}

export default InputDebounced
