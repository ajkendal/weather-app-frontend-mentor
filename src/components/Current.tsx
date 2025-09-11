import { getWeatherIcon } from '../utils/getWeatherIcons'
import styles from '../styles/Current.module.scss'

interface CurrentProps {
  isLoading: boolean
  currentData: any
  searchCity: string
}

const Current = ({ isLoading, currentData, searchCity }: CurrentProps) => {
  {
    console.log(isLoading)
  }
  return (
    <div className={styles['current-container']}>
      {isLoading ? (
        <div className={`content-container ${styles['loading-indicator']}`}>
          <img src='/images/icons/bouncing-circles.svg' alt='Loading Icon' />
          <p className='text-preset-6'>Loading...</p>
        </div>
      ) : null}
    </div>
  )
}

export default Current
