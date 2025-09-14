import React, { useRef, useState, useEffect } from 'react'
import styles from '../styles/Hourly.module.scss'
import { getWeatherIcon } from '../utils/getWeatherIcons'

interface HourlyProps {
  hourlyData: Array<{
    time: string[]
    temperature_2m: number[]
    weather_code: number[]
    day: string
  }> | null
  isLoading: boolean
  currentDateNumber: number
}

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

const Hourly = ({ hourlyData, isLoading, currentDateNumber }: HourlyProps) => {
  const startDay = currentDateNumber
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedDay, setSelectedDay] = useState(startDay)

  const blankHours = 10

  const scrollRef = useRef<HTMLDivElement>(null)
  const isDown = useRef(false)
  const startY = useRef(0)
  const scrollTop = useRef(0)

  useEffect(() => {
    setSelectedDay(startDay)
  }, [startDay])

  const handleMouseDown = (e: React.MouseEvent) => {
    isDown.current = true
    startY.current =
      e.pageY - (scrollRef.current?.getBoundingClientRect().top || 0)
    scrollTop.current = scrollRef.current?.scrollTop || 0
    document.body.style.userSelect = 'none'
  }

  const handleMouseLeave = () => {
    isDown.current = false
    document.body.style.userSelect = ''
  }

  const handleMouseUp = () => {
    isDown.current = false
    document.body.style.userSelect = ''
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown.current) return
    e.preventDefault()
    const y = e.pageY - (scrollRef.current?.getBoundingClientRect().top || 0)
    const walk = y - startY.current
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollTop.current - walk
    }
  }

  const dropDown = () => {
    return (
      <div className={`dropdown-style ${styles['dropdown-menu']}`}>
        {Array.from({ length: hourlyData?.length || 0 }).map((_, i) => {
          const day = (startDay + i) % 7
          const isActive = day === selectedDay
          return (
            <button
              className={`dropdown-item ${isActive ? 'active' : ''}`}
              key={i}
              onClick={() => {
                setSelectedDay(day)
                setShowDropdown(false)
              }}
            >
              {daysOfWeek[day]}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div className={`content-container ${styles['hourly-container']}`}>
      <div className={styles['hourly-header']}>
        <h4 className='text-preset-5'>Hourly forecast</h4>
        <div className='hourly-button-wrapper'>
          <button
            className={`dropdown-button ${styles['hourly-button']} ${
              showDropdown ? 'open' : ''
            }`}
            aria-haspopup='menu'
            aria-expanded={showDropdown}
            aria-controls='hourly-day-menu'
            onClick={() => setShowDropdown(!showDropdown)}
            disabled={isLoading}
          >
            {daysOfWeek[selectedDay]}
          </button>
          {showDropdown && (
            <div id='hourly-day-menu' role='menu'>
              {dropDown()}
            </div>
          )}
        </div>
      </div>

      <div
        ref={scrollRef}
        className={styles['hourly-scroll']}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {isLoading
          ? Array.from({ length: blankHours }, (_, i) => (
              <div
                key={i}
                className={`content-container ${styles['hourly-item']}`}
              ></div>
            ))
          : hourlyData && hourlyData[selectedDay]
          ? Array.from(
              { length: hourlyData[selectedDay].time.length },
              (_, i: number) => (
                <div
                  key={i}
                  className={`content-container ${styles['hourly-item']}`}
                >
                  <div className={styles['icon-time']}>
                    <img
                      src={getWeatherIcon(
                        hourlyData[selectedDay].weather_code[i]
                      )}
                      alt='Weather Icon'
                    />
                    <p className='text-preset-5-medium'>
                      {hourlyData[selectedDay].time[i]}
                    </p>
                  </div>

                  <p className='text-preset-7'>
                    {Math.round(hourlyData[selectedDay].temperature_2m[i])}°
                  </p>
                </div>
              )
            )
          : null}
      </div>
    </div>
  )
}

export default Hourly
