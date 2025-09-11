import { useState, useEffect } from 'react'
import { getWeather } from './utils/getWeather'
import { calculateHourlyWeather } from './utils/calculateHourly'

function App() {
  const [coordinates, setCoordinates] = useState<{
    latitude: number
    longitude: number
  }>({ latitude: 0, longitude: 0 })

  const [isMetric, setIsMetric] = useState(false)
  const [weatherData, setWeatherData] = useState({})

  useEffect(() => {
    const fetchWeather = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            setCoordinates({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            })
            const data = await getWeather(
              coordinates.latitude,
              coordinates.longitude,
              isMetric
            )
            if ('hourly' in data) {
              const hourlyData = calculateHourlyWeather(data.hourly)
              setWeatherData({
                current: data.current,
                daily: data.daily,
                hourly: hourlyData,
              })
            } else {
              setWeatherData(data)
            }
          },
          (error) => {
            console.error('Error obtaining location:', error)
          }
        )
      } else {
        console.error('Geolocation is not supported by this browser.')
      }
    }
    fetchWeather()
  }, [])

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
