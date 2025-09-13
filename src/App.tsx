import { useState, useEffect } from 'react'
import { getWeather } from './utils/getWeather'

import { formatHourly } from './utils/formatHourly'
import { formatDaily } from './utils/formatDaily'
import SearchBar from './components/SearchBar'
import Header from './components/Header'
import ErrorState from './components/ErrorState'
import Current from './components/Current'
import Daily from './components/Daily'
import Hourly from './components/Hourly'

function App() {
  const [coordinates, setCoordinates] = useState<{
    latitude: number
    longitude: number
  }>({ latitude: 0, longitude: 0 })
  const [isLoading, setIsLoading] = useState(true)
  const [searchCity, setSearchCity] = useState('Null Island')
  const [isError, setIsError] = useState('')
  const [isMetric, setIsMetric] = useState(false)
  const [weatherData, setWeatherData] = useState<{
    current?: any
    daily?: any
    hourly?: any
  }>({})
  const currentDateNumber = weatherData.current
    ? weatherData.current.time.getDay()
    : 0

  const fetchWeather = async () => {
    setIsLoading(true)
    const data = await getWeather(
      coordinates.latitude,
      coordinates.longitude,
      isMetric,
      setIsError
    )

    if ('error' in data) {
      setIsError('Error fetching weather data.')
      setWeatherData({})
    } else {
      const hourlyData = formatHourly(data.hourly)
      const dailyData = formatDaily(data.daily)
      setWeatherData({
        current: data.current,
        daily: dailyData,
        hourly: hourlyData,
      })
    }
    // setIsLoading(false)
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      })
    } else {
      setIsError('Geolocation is not supported by this browser.')
      console.error('Geolocation is not supported by this browser.')
    }
  }, [])

  useEffect(() => {
    fetchWeather()
    if (coordinates.latitude !== 0 && coordinates.longitude !== 0) {
      setSearchCity('Current Location')
    } else {
      setSearchCity('Null Island')
    }
    console.log('weather data updated', weatherData)
  }, [isMetric, coordinates])

  return (
    <main className='container'>
      <Header isMetric={isMetric} setIsMetric={setIsMetric} isError={isError} />

      {isError ? (
        <ErrorState message={isError} />
      ) : (
        <>
          <SearchBar
            setCoordinates={setCoordinates}
            setSearchCity={setSearchCity}
          />
          <div className='flex-container'>
            <div className='current-daily-section'>
              <Current
                searchCity={searchCity}
                isLoading={isLoading}
                currentData={weatherData.current}
                isMetric={isMetric}
              />
              <Daily
                currentDateNumber={currentDateNumber}
                dailyData={weatherData.daily}
                isLoading={isLoading}
              />
            </div>
            <div className='hourly-section'>
              <Hourly
                hourlyData={weatherData.hourly}
                isLoading={isLoading}
                currentDateNumber={currentDateNumber}
              />
            </div>
          </div>
        </>
      )}
    </main>
  )
}

export default App
