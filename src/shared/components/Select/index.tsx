import React, { useState, useRef } from 'react'

import useOnOutsideClick from '../../hooks/useOutsideClick'
import { KeyCodes } from '../../enums/keyCodes'
import Icon from '../Icon'

import Dropdown from './Dropdown'
import {
  StyledSelect,
  ValueContainer,
  ChevronIcon,
  Placeholder,
  ValueMulti,
  ValueMultiItem,
  AddMore
} from './Styles'

interface SelectProps {
  className?: string
  variant?: 'normal' | 'empty'
  dropdownWidth?: number
  name?: string
  value?: any[] | number | string
  defaultValue?: any
  placeholder?: string
  invalid?: boolean
  options: any[]
  onChange: (params: any) => void
  onCreate?: () => void
  isMulti: boolean
  withClearValue: boolean
  renderValue?: (params: any) => void
  renderOption: (params: any) => void
}

const Select = ({
  className,
  variant = 'normal',
  dropdownWidth,
  name,
  value: propsValue,
  defaultValue,
  placeholder = 'Select',
  invalid,
  options,
  onChange,
  onCreate,
  isMulti,
  withClearValue,
  renderValue: propsRenderValue,
  renderOption: propsRenderOption
}: SelectProps) => {
  const [stateValue, setStateValue] = useState(
    defaultValue || (isMulti ? [] : null)
  )
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')

  const isControlled = propsValue !== undefined
  const value = isControlled ? propsValue : stateValue

  const $selectRef = useRef<any>()
  const $inputRef = useRef<any>()

  const activateDropdown = () => {
    if (isDropdownOpen) {
      $inputRef.current.focus()
    } else {
      setDropdownOpen(true)
    }
  }

  const deactivateDropdown = () => {
    setDropdownOpen(false)
    setSearchValue('')
    $selectRef.current.focus()
  }

  useOnOutsideClick([$selectRef], isDropdownOpen, deactivateDropdown)

  const preserveValueType = (newValue: any) => {
    const areOptionValuesNumbers = options.some(
      (option) => typeof option.value === 'number'
    )

    if (areOptionValuesNumbers) {
      if (isMulti) {
        return newValue.map(Number)
      }
      if (newValue) {
        return Number(newValue)
      }
    }
    return newValue
  }

  const handleChange = (newValue: any) => {
    if (!isControlled) {
      setStateValue(preserveValueType(newValue))
    }
    onChange(preserveValueType(newValue))
  }

  const removeOptionValue = (optionValue: any) => {
    handleChange(value.filter((val: any) => val !== optionValue))
  }

  const handleFocusedSelectKeydown = (event: any) => {
    if (isDropdownOpen) return

    if (event.keyCode === KeyCodes.ENTER) {
      event.preventDefault()
    }
    if (
      event.keyCode !== KeyCodes.ESCAPE &&
      event.keyCode !== KeyCodes.TAB &&
      !event.shiftKey
    ) {
      setDropdownOpen(true)
    }
  }

  const getOption = (optionValue: any) =>
    options.find((option) => option.value === optionValue)
  const getOptionLabel = (optionValue: any) =>
    (getOption(optionValue) || { label: '' }).label

  const isValueEmpty = isMulti ? !value.length : !getOption(value)

  return (
    <StyledSelect
      className={className}
      variant={variant}
      ref={$selectRef}
      tabIndex={0}
      onKeyDown={handleFocusedSelectKeydown}
      invalid={invalid}
    >
      <ValueContainer
        variant={variant}
        data-testid={name ? `select:${name}` : 'select'}
        onClick={activateDropdown}
      >
        {isValueEmpty && <Placeholder>{placeholder}</Placeholder>}

        {!isValueEmpty && !isMulti && propsRenderValue
          ? propsRenderValue({ value })
          : getOptionLabel(value)}

        {!isValueEmpty && isMulti && (
          <ValueMulti variant={variant}>
            {value.map((optionValue: any) =>
              propsRenderValue ? (
                propsRenderValue({
                  value: optionValue,
                  removeOptionValue: () => removeOptionValue(optionValue)
                })
              ) : (
                <ValueMultiItem
                  key={optionValue}
                  onClick={() => removeOptionValue(optionValue)}
                >
                  {getOptionLabel(optionValue)}
                  <Icon type="close" size={14} />
                </ValueMultiItem>
              )
            )}
            <AddMore>
              <Icon type="plus" />
              Add more
            </AddMore>
          </ValueMulti>
        )}

        {(!isMulti || isValueEmpty) && variant !== 'empty' && (
          <ChevronIcon type="chevron-down" top={1} />
        )}
      </ValueContainer>

      {isDropdownOpen && (
        <Dropdown
          dropdownWidth={dropdownWidth}
          value={value}
          isValueEmpty={isValueEmpty}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          $selectRef={$selectRef}
          $inputRef={$inputRef}
          deactivateDropdown={deactivateDropdown}
          options={options}
          onChange={handleChange}
          onCreate={onCreate}
          isMulti={isMulti}
          withClearValue={withClearValue}
          propsRenderOption={propsRenderOption}
        />
      )}
    </StyledSelect>
  )
}

export default Select
