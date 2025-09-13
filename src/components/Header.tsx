import styles from '../styles/Header.module.scss'
import { useState } from 'react'

type HeaderProps = {
  isMetric: boolean
  setIsMetric: (value: boolean) => void
  isError: string
}

const Header = ({ isMetric, setIsMetric, isError }: HeaderProps) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const dropdDown = () => {
    return (
      <div className={`dropdown-style ${styles['dropdown-menu']}`}>
        <button className='button' onClick={() => setIsMetric(!isMetric)}>
          {isMetric ? 'Switch to Imperial' : 'Switch to Metric'}
        </button>
        <p className='dropdown-description'>Temperature</p>
        <div className={`dropdown-item ${isMetric ? 'active' : ''}`}>
          <p className='dropdown-item-label'>Celsius (°C)</p>
          {isMetric && (
            <img src='/images/icons/icon-checkmark.svg' alt='Check Icon' />
          )}
        </div>
        <div className={`dropdown-item ${!isMetric ? 'active' : ''}`}>
          <p className='dropdown-item-label'>Fahrenheit (°F)</p>
          {!isMetric && (
            <img src='/images/icons/icon-checkmark.svg' alt='Check Icon' />
          )}
        </div>
        <hr />
        <p className='dropdown-description'>Wind Speed</p>
        <div className={`dropdown-item ${isMetric ? 'active' : ''}`}>
          <p className='dropdown-item-label'>km/h</p>
          {isMetric && (
            <img src='/images/icons/icon-checkmark.svg' alt='Check Icon' />
          )}
        </div>
        <div className={`dropdown-item ${!isMetric ? 'active' : ''}`}>
          <p className='dropdown-item-label'>mph</p>
          {!isMetric && (
            <img src='/images/icons/icon-checkmark.svg' alt='Check Icon' />
          )}
        </div>
        <hr />
        <p className='dropdown-description'>Precipitation</p>
        <div className={`dropdown-item ${isMetric ? 'active' : ''}`}>
          <p className='dropdown-item-label'>Millimeters (mm)</p>
          {isMetric && (
            <img src='/images/icons/icon-checkmark.svg' alt='Check Icon' />
          )}
        </div>
        <div className={`dropdown-item ${!isMetric ? 'active' : ''}`}>
          <p className='dropdown-item-label'>Inches (in)</p>
          {!isMetric && (
            <img src='/images/icons/icon-checkmark.svg' alt='Check Icon' />
          )}
        </div>
      </div>
    )
  }

  return (
    <header className={styles['header']}>
      <nav className={styles['nav']}>
        <a href='#' aria-label='Home'>
          <img src='/images/icons/logo.svg' alt='Homepage Logo' />
        </a>
        <button
          className={`units-button ${showDropdown ? 'open' : ''}`}
          aria-label='Toggle Metric/Imperial'
          onClick={() => {
            setShowDropdown(!showDropdown)
          }}
        >
          Units
        </button>
        {showDropdown && dropdDown()}
      </nav>
      {!isError && (
        <h1 className='text-preset-2'>How's the sky looking today?</h1>
      )}
    </header>
  )
}

export default Header
