import { useState, useEffect } from 'react'
import { getWeather } from './utils/getWeather'

function App() {
  const [coordinates, setCoordinates] = useState<{
    latitude: number
    longitude: number
  }>({ latitude: 0, longitude: 0 })

  const [isMetric, setIsMetric] = useState(false)
  const [weatherData, setWeatherData] = useState<any>(null)

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
            setWeatherData(data)
            console.log(data)
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
