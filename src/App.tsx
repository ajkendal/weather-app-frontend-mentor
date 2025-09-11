import { useState, useEffect } from 'react'
import { getWeather } from './utils/getWeather'

import { formatHourly } from './utils/formatHourly'
import { formatDaily } from './utils/formatDaily'

function App() {
  const [coordinates, setCoordinates] = useState<{
    latitude: number
    longitude: number
  }>({ latitude: 0, longitude: 0 })
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('')
  const [isMetric, setIsMetric] = useState(false)
  const [weatherData, setWeatherData] = useState({})

  const fetchWeather = async () => {
    setIsLoading(true)
    const data = await getWeather(
      coordinates.latitude,
      coordinates.longitude,
      isMetric
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
        'We couldn’t connect to the server (API error). Please try again in a few moments.'
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
    } else {
      setIsError('Geolocation is not supported by this browser.')
      console.error('Geolocation is not supported by this browser.')
    }
  }, [])

  useEffect(() => {
    fetchWeather()
  }, [isMetric, coordinates])

  return (
    <>
      <h1>Under Construction</h1>
      {coordinates?.latitude && coordinates?.longitude ? (
        <p>
          Latitude: {coordinates.latitude}, Longitude: {coordinates.longitude}
        </p>
      ) : (
        <p>Please provide your location.</p>
      )}
    </>
  )
}

export default App
