import React, {
  useState,
  useRef,
  useLayoutEffect,
  KeyboardEventHandler
} from 'react'
import { uniq } from 'lodash'

import { KeyCodes } from '../../enums/keyCodes'

import {
  ClearIcon,
  Dropdown,
  DropdownInput,
  Options,
  Option,
  OptionsNoResults
} from './Styles'

interface SelectDropdownProps {
  dropdownWidth?: number
  value?: any
  isValueEmpty: boolean
  searchValue: string
  setSearchValue: (param: any) => void
  $inputRef: any
  $selectRef: any
  deactivateDropdown: () => void
  options: any[]
  onChange: (param?: any) => void
  onCreate?: (param?: any, callback?: any) => any
  isMulti: boolean
  withClearValue: boolean
  propsRenderOption: (param: any) => void
}

const SelectDropdown = ({
  dropdownWidth,
  value,
  isValueEmpty,
  searchValue,
  setSearchValue,
  $inputRef,
  deactivateDropdown,
  options,
  onChange,
  onCreate,
  isMulti,
  withClearValue,
  propsRenderOption
}: SelectDropdownProps) => {
  const [isCreatingOption, setCreatingOption] = useState(false)

  const $optionsRef = useRef<any>()

  useLayoutEffect(() => {
    const setFirstOptionAsActive = () => {
      const $active = getActiveOptionNode()
      if ($active) $active.classList.remove(activeOptionClass)

      if ($optionsRef.current.firstElementChild) {
        $optionsRef.current.firstElementChild.classList.add(activeOptionClass)
      }
    }
    setFirstOptionAsActive()
  })

  const selectOptionValue = (optionValue: any) => {
    deactivateDropdown()
    if (isMulti) {
      onChange(uniq([...value, optionValue]))
    } else {
      onChange(optionValue)
    }
  }

  const createOption = (newOptionLabel: any) => {
    setCreatingOption(true)
    onCreate &&
      onCreate(newOptionLabel, (createdOptionValue: any) => {
        setCreatingOption(false)
        selectOptionValue(createdOptionValue)
      })
  }

  const clearOptionValues = () => {
    $inputRef.current.value = ''
    $inputRef.current.focus()
    onChange(isMulti ? [] : null)
  }

  const handleInputKeyDown = (event: any) => {
    if (event.keyCode === KeyCodes.ESCAPE) {
      handleInputEscapeKeyDown(event)
    } else if (event.keyCode === KeyCodes.ENTER) {
      handleInputEnterKeyDown(event)
    } else if (
      event.keyCode === KeyCodes.ARROW_DOWN ||
      event.keyCode === KeyCodes.ARROW_UP
    ) {
      handleInputArrowUpOrDownKeyDown(event)
    }
  }

  const handleInputEscapeKeyDown = (event: any) => {
    event.nativeEvent.stopImmediatePropagation()
    deactivateDropdown()
  }

  const handleInputEnterKeyDown = (event: Event) => {
    event.preventDefault()

    const $active = getActiveOptionNode()
    if (!$active) return

    const optionValueToSelect = $active.getAttribute('data-select-option-value')
    const optionLabelToCreate = $active.getAttribute('data-create-option-label')

    if (optionValueToSelect) {
      selectOptionValue(optionValueToSelect)
    } else if (optionLabelToCreate) {
      createOption(optionLabelToCreate)
    }
  }

  const handleInputArrowUpOrDownKeyDown = (event: KeyboardEvent) => {
    const $active = getActiveOptionNode()
    if (!$active) return

    const $options = $optionsRef.current
    const $optionsHeight = $options.getBoundingClientRect().height
    const $activeHeight = $active.getBoundingClientRect().height

    if (event.keyCode === KeyCodes.ARROW_DOWN) {
      if ($options.lastElementChild === $active) {
        $active.classList.remove(activeOptionClass)
        $options.firstElementChild.classList.add(activeOptionClass)
        $options.scrollTop = 0
      } else {
        $active.classList.remove(activeOptionClass)
        $active.nextElementSibling.classList.add(activeOptionClass)
        if ($active.offsetTop > $options.scrollTop + $optionsHeight / 1.4) {
          $options.scrollTop += $activeHeight
        }
      }
    } else if (event.keyCode === KeyCodes.ARROW_UP) {
      if ($options.firstElementChild === $active) {
        $active.classList.remove(activeOptionClass)
        $options.lastElementChild.classList.add(activeOptionClass)
        $options.scrollTop = $options.scrollHeight
      } else {
        $active.classList.remove(activeOptionClass)
        $active.previousElementSibling.classList.add(activeOptionClass)
        if ($active.offsetTop < $options.scrollTop + $optionsHeight / 2.4) {
          $options.scrollTop -= $activeHeight
        }
      }
    }
  }

  const handleOptionMouseEnter = (event: any) => {
    const $active = getActiveOptionNode()
    if ($active) $active.classList.remove(activeOptionClass)
    event.currentTarget.classList.add(activeOptionClass)
  }

  const getActiveOptionNode = () =>
    $optionsRef.current.querySelector(`.${activeOptionClass}`)

  const optionsFilteredBySearchValue = options.filter((option: any) =>
    option.label.toString().toLowerCase().includes(searchValue.toLowerCase())
  )

  const removeSelectedOptionsMulti = (opts: any) =>
    opts.filter((option: any) => !value.includes(option.value))
  const removeSelectedOptionsSingle = (opts: any) =>
    opts.filter((option: any) => value !== option.value)

  const filteredOptions = isMulti
    ? removeSelectedOptionsMulti(optionsFilteredBySearchValue)
    : removeSelectedOptionsSingle(optionsFilteredBySearchValue)

  const isSearchValueInOptions = options
    .map((option: any) => option.label)
    .includes(searchValue)
  const isOptionCreatable = onCreate && searchValue && !isSearchValueInOptions

  return (
    <Dropdown width={dropdownWidth}>
      <DropdownInput
        type="text"
        placeholder="Search"
        ref={$inputRef}
        autoFocus
        onKeyDown={handleInputKeyDown}
        onChange={(event) => setSearchValue(event.target.value)}
      />

      {!isValueEmpty && withClearValue && (
        <ClearIcon type="close" onClick={clearOptionValues} />
      )}

      <Options ref={$optionsRef}>
        {filteredOptions.map((option: any) => (
          <Option
            key={option.value}
            data-select-option-value={option.value}
            data-testid={`select-option:${option.label}`}
            onMouseEnter={handleOptionMouseEnter}
            onClick={() => selectOptionValue(option.value)}
          >
            {propsRenderOption ? propsRenderOption(option) : option.label}
          </Option>
        ))}

        {isOptionCreatable && (
          <Option
            data-create-option-label={searchValue}
            onMouseEnter={handleOptionMouseEnter}
            onClick={() => createOption(searchValue)}
          >
            {isCreatingOption
              ? `Creating "${searchValue}"...`
              : `Create "${searchValue}"`}
          </Option>
        )}
      </Options>

      {filteredOptions.length === 0 && (
        <OptionsNoResults>No results</OptionsNoResults>
      )}
    </Dropdown>
  )
}

const activeOptionClass = 'jira-select-option-is-active'

export default SelectDropdown
