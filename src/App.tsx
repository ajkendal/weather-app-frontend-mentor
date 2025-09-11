import { useState, useEffect } from 'react'
import { getWeather } from './utils/getWeather'

import { formatHourly } from './utils/formatHourly'
import { formatDaily } from './utils/formatDaily'
import SearchBar from './components/SearchBar'
import Header from './components/Header'

function App() {
  const [coordinates, setCoordinates] = useState<{
    latitude: number
    longitude: number
  }>({ latitude: 0, longitude: 0 })
  const [isLoading, setIsLoading] = useState(false)
  const [searchCity, setSearchCity] = useState('')
  const [isError, setIsError] = useState('')
  const [isMetric, setIsMetric] = useState(false)
  const [weatherData, setWeatherData] = useState({})

  const fetchWeather = async () => {
    setIsLoading(true)
    const data = await getWeather(
      coordinates.latitude,
      coordinates.longitude,
      isMetric,
      setIsError
    )
    if ('hourly' in data) {
      const hourlyData = formatHourly(data.hourly)
      const dailyData = formatDaily(data.daily)
      setWeatherData({
        current: data.current,
        daily: dailyData,
        hourly: hourlyData,
      })
    } else {
      setIsError(
        'Error fetching weather data. Please try again in a few moments.'
      )
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      })
      setSearchCity('Current Location')
    } else {
      setIsError('Geolocation is not supported by this browser.')
      console.error('Geolocation is not supported by this browser.')
    }
  }, [])

  useEffect(() => {
    fetchWeather()
    console.log('Fetching weather data...', weatherData)
  }, [isMetric, coordinates])

  return (
    <main className='container'>
      <Header isMetric={isMetric} setIsMetric={setIsMetric} />
      <SearchBar
        setCoordinates={setCoordinates}
        setSearchCity={setSearchCity}
      />
    </main>
  )
}

export default App
