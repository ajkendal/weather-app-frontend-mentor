import styles from '../styles/Daily.module.scss'
import { getWeatherIcon } from '../utils/getWeatherIcons'

interface DailyProps {
  currentDateNumber: number
  dailyData: Array<{
    time: Date
    temperature_2m_max: number
    temperature_2m_min: number
    weather_code: number
  }> | null
  isLoading: boolean
}

const Daily = ({ currentDateNumber, dailyData, isLoading }: DailyProps) => {
  const blank = 7
  const startDay = currentDateNumber

  return (
    <div>
      <h3 className='text-preset-5'>Daily forecast</h3>

      <div className={styles['daily-container']}>
        {isLoading
          ? Array.from({ length: blank }).map((_, i) => (
              <div
                className={`content-container ${styles['daily-item']}`}
                key={i}
              ></div>
            ))
          : dailyData &&
            dailyData.map((_item: any, i: number) => {
              const day = (startDay + i) % 7
              return (
                <div
                  className={`content-container ${styles['daily-item']}`}
                  key={i}
                >
                  <h4 className='text-preset-6'>
                    {dailyData[day].time.toLocaleDateString('en-US', {
                      weekday: 'short',
                    })}
                  </h4>
                  <img
                    src={getWeatherIcon(dailyData[day].weather_code)}
                    alt='Weather Icon'
                  />
                  <div className={styles['temp-container']}>
                    <p className='text-preset-7'>
                      {Math.round(dailyData[day].temperature_2m_max)}°
                    </p>
                    <p className='text-preset-7'>
                      {Math.round(dailyData[day].temperature_2m_min)}°
                    </p>
                  </div>
                </div>
              )
            })}
      </div>
    </div>
  )
}

export default Daily
