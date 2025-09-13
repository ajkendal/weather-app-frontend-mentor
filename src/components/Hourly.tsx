import React, { useRef, useState } from 'react'
import styles from '../styles/Hourly.module.scss'

interface HourlyProps {
  hourlyData: Array<{
    time: string
    temperature_2m: number
    weather_code: number
  }> | null
  isLoading: boolean
  currentDateNumber: number
}

const Hourly = ({ hourlyData, isLoading, currentDateNumber }: HourlyProps) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [selectedDay, setSelectedDay] = useState('')
  const blankHours = 24
  const startDay = currentDateNumber

  const scrollRef = useRef<HTMLDivElement>(null)
  const isDown = useRef(false)
  const startY = useRef(0)
  const scrollTop = useRef(0)

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
    return <div>test</div>
  }

  return (
    <div className={`content-container ${styles['hourly-container']}`}>
      <div className={styles['hourly-header']}>
        <h4 className='text-preset-5'>Hourly forecast</h4>
        <button
          className={`dropdown-button ${styles['hourly-button']}`}
          onClick={() => setShowDropdown(!showDropdown)}
          disabled={isLoading}
        >
          {isLoading ? '-' : selectedDay}
        </button>
        {showDropdown && dropDown()}
      </div>

      <div
        ref={scrollRef}
        className={styles['hourly-scroll']}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {Array.from({ length: blankHours }, (_, i) => (
          <div key={i} className={`content-container ${styles['hourly-item']}`}>
            {isLoading ? '' : ''}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Hourly
