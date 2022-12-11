import { useLayoutEffect, useRef } from 'react'
import moment from 'moment'
import { range } from 'lodash'

import { formatDate, formatDateTimeForAPI } from '../../utils/dateTime'

import { TimeSection, Time } from './Styles'

interface DatePickerTimeSectionProps {
  value?: string
  onChange: (...args: any) => void
  setDropdownOpen: (...args: any) => void
}

const DatePickerTimeSection = ({
  value,
  onChange,
  setDropdownOpen
}: DatePickerTimeSectionProps) => {
  const $sectionRef = useRef<any>()

  useLayoutEffect(() => {
    scrollToSelectedTime($sectionRef.current, value)
  }, [value])

  const handleTimeChange = (newTime: string) => {
    const [newHour, newMinute] = newTime.split(':')

    const existingDateWithNewTime = moment(value).set({
      hour: Number(newHour),
      minute: Number(newMinute)
    })
    onChange(formatDateTimeForAPI(existingDateWithNewTime))
    setDropdownOpen(false)
  }

  return (
    <TimeSection ref={$sectionRef}>
      {generateTimes().map((time) => (
        <Time
          key={time}
          data-time={time}
          isSelected={time === formatTime(value)}
          onClick={() => handleTimeChange(time)}
        >
          {time}
        </Time>
      ))}
    </TimeSection>
  )
}

const formatTime = (value: any) => formatDate(value, 'HH:mm')

const scrollToSelectedTime = ($scrollCont: any, value: any) => {
  if (!$scrollCont) return

  const $selectedTime = $scrollCont.querySelector(
    `[data-time="${formatTime(value)}"]`
  )
  if (!$selectedTime) return

  $scrollCont.scrollTop = $selectedTime.offsetTop - 80
}

const generateTimes = () =>
  range(48).map((i) => {
    const hour = `${Math.floor(i / 2)}`
    const paddedHour = hour.length < 2 ? `0${hour}` : hour
    const minute = i % 2 === 0 ? '00' : '30'
    return `${paddedHour}:${minute}`
  })

export default DatePickerTimeSection
