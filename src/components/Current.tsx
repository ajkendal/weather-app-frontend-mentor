import { getWeatherIcon } from '../utils/getWeatherIcons'
import styles from '../styles/Current.module.scss'

interface CurrentProps {
  isLoading: boolean
  currentData: any
  searchCity: string
  isMetric: boolean
}

const Current = ({
  isLoading,
  currentData,
  searchCity,
  isMetric,
}: CurrentProps) => {
  return (
    <div className={styles['current-container']}>
      {isLoading ? (
        <div className={`content-container ${styles['loading-indicator']}`}>
          <img src='/images/icons/bouncing-circles.svg' alt='Loading Icon' />
          <p className='text-preset-6'>Loading...</p>
        </div>
      ) : (
        <div className={`content-container ${styles['main-current']}`}>
          text
        </div>
      )}
      <div className={styles['current-blocks']}>
        <div className={`content-container ${styles['current-block']}`}>
          <h4 className='text-preset-6'>Feels Like</h4>
          <p className='text-preset-3'>
            {currentData.apparent_temperature.toString() !== 'undefined'
              ? Math.round(currentData.apparent_temperature) + '°'
              : '-'}
          </p>
        </div>
        <div className={`content-container ${styles['current-block']}`}>
          <h4 className='text-preset-6'>Humidity</h4>
          <p className='text-preset-3'>
            {currentData.relative_humidity_2m.toString() !== 'undefined'
              ? Math.round(currentData.relative_humidity_2m) + '%'
              : '-'}
          </p>
        </div>
        <div className={`content-container ${styles['current-block']}`}>
          <h4 className='text-preset-6'>Wind</h4>
          <p className='text-preset-3'>
            {currentData.wind_speed_10m.toString() !== 'undefined'
              ? Math.round(currentData.wind_speed_10m) +
                (isMetric ? ' km/h' : ' mph')
              : '-'}
          </p>
        </div>
        <div className={`content-container ${styles['current-block']}`}>
          <h4 className='text-preset-6'>Precipitation</h4>
          <p className='text-preset-3'>
            {currentData.precipitation.toString() !== 'undefined'
              ? Math.round(currentData.precipitation) +
                (isMetric ? ' mm' : ' in')
              : '-'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Current
