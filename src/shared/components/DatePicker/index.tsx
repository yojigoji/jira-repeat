import React, { useState, useRef } from 'react'

import { formatDate, formatDateTime } from '@/shared/utils/dateTime'
import useOnOutsideClick from '@/shared/hooks/useOutsideClick'
import Input from '@/shared/components/Input'

import DateSection from './DateSection'
import TimeSection from './TimeSection'
import { StyledDatePicker, Dropdown } from './Styles'

interface DatePcikerProps {
  className?: string
  withTime?: boolean
  value?: string
  onChange: () => {}
}

const DatePicker = ({
  className,
  withTime = true,
  value,
  onChange,
  ...inputProps
}: DatePcikerProps) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const $containerRef = useRef<any>()

  useOnOutsideClick([$containerRef], isDropdownOpen, () =>
    setDropdownOpen(false)
  )

  return (
    <StyledDatePicker ref={$containerRef}>
      <Input
        icon="calendar"
        {...inputProps}
        className={className}
        autoComplete="off"
        value={getFormattedInputValue(value, withTime)}
        onClick={() => setDropdownOpen(true)}
      />
      {isDropdownOpen && (
        <Dropdown withTime={withTime}>
          <DateSection
            withTime={withTime}
            value={value}
            onChange={onChange}
            setDropdownOpen={setDropdownOpen}
          />
          {withTime && (
            <TimeSection
              value={value}
              onChange={onChange}
              setDropdownOpen={setDropdownOpen}
            />
          )}
        </Dropdown>
      )}
    </StyledDatePicker>
  )
}

const getFormattedInputValue = (value: any, withTime: any) => {
  if (!value) return ''
  return withTime ? formatDateTime(value) : formatDate(value)
}

export default DatePicker
