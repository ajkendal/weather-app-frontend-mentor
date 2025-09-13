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
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }

  const feelsLike = currentData
    ? Math.round(currentData.apparent_temperature)
    : '-'

  const humidity = currentData
    ? Math.round(currentData.relative_humidity_2m)
    : '-'

  const wind = currentData ? Math.round(currentData.wind_speed_10m) : '-'

  const precipitation = currentData
    ? Math.round(currentData.precipitation)
    : '-'
  const temperature = currentData ? Math.round(currentData.temperature_2m) : '-'

  const date = currentData
    ? new Date(currentData.time).toLocaleDateString('en-US', options)
    : ''

  return (
    <div className={styles['current-container']}>
      {isLoading ? (
        <div className={`content-container ${styles['loading-indicator']}`}>
          <img src='/images/icons/bouncing-circles.svg' alt='Loading Icon' />
          <p className='text-preset-6'>Loading...</p>
        </div>
      ) : (
        <div className={`content-container ${styles['main-current']}`}>
          <div className={styles['current-text']}>
            <p className='text-preset-4'>{searchCity}</p>
            <p className='text-preset-6'>{date}</p>
          </div>
          <div className={styles['current-icon']}>
            <img
              src={getWeatherIcon(currentData.weathercode)}
              alt='Weather Icon'
            />
            <p className='text-preset-1'>
              {temperature.toString() !== 'undefined' ? temperature + '°' : '-'}
            </p>
          </div>
        </div>
      )}
      <div className={styles['current-blocks']}>
        <div className={`content-container ${styles['current-block']}`}>
          <h4 className='text-preset-6'>Feels Like</h4>
          <p className='text-preset-3'>
            {feelsLike.toString() !== 'undefined' ? feelsLike + '°' : '-'}
          </p>
        </div>
        <div className={`content-container ${styles['current-block']}`}>
          <h4 className='text-preset-6'>Humidity</h4>
          <p className='text-preset-3'>
            {humidity.toString() !== 'undefined' ? humidity + '%' : '-'}
          </p>
        </div>
        <div className={`content-container ${styles['current-block']}`}>
          <h4 className='text-preset-6'>Wind</h4>
          <p className='text-preset-3'>
            {wind.toString() !== 'undefined'
              ? wind + (isMetric ? ' km/h' : ' mph')
              : '-'}
          </p>
        </div>
        <div className={`content-container ${styles['current-block']}`}>
          <h4 className='text-preset-6'>Precipitation</h4>
          <p className='text-preset-3'>
            {precipitation.toString() !== 'undefined'
              ? precipitation + (isMetric ? ' mm' : ' in')
              : '-'}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Current
