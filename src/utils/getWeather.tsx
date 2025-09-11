import { fetchWeatherApi } from 'openmeteo'

const getWeather = async (
  latitude: number,
  longitude: number,
  isMetric: boolean,
  setIsError: (message: string) => void
) => {
  const units = isMetric
    ? { temperature: 'celsius', wind_speed: 'kmh', precipitation: 'mm' }
    : { temperature: 'fahrenheit', wind_speed: 'mph', precipitation: 'inch' }

  const url = import.meta.env.VITE_WEATHER_API_URL
  const params = {
    latitude: latitude,
    longitude: longitude,
    daily: ['weather_code', 'temperature_2m_max', 'temperature_2m_min'],
    hourly: ['temperature_2m', 'weather_code'],
    current: [
      'temperature_2m',
      'relative_humidity_2m',
      'apparent_temperature',
      'wind_speed_10m',
      'weather_code',
      'precipitation',
    ],
    timezone: 'auto',
    temperature_unit: units.temperature,
    wind_speed_unit: units.wind_speed,
    precipitation_unit: units.precipitation,
  }

  try {
    const responses = await fetchWeatherApi(url, params)
    const response = responses[0]
    const current = response.current()!
    const hourly = response.hourly()!
    const daily = response.daily()!

    const utcOffsetSeconds = new Date().getTimezoneOffset() * 60
    const currentUtcOffsetSeconds = response.utcOffsetSeconds()

    const weatherData = {
      current: {
        time: new Date(
          (Number(current.time()) + currentUtcOffsetSeconds) * 1000
        ),
        temperature_2m: current.variables(0)!.value(),
        relative_humidity_2m: current.variables(1)!.value(),
        apparent_temperature: current.variables(2)!.value(),
        wind_speed_10m: current.variables(3)!.value(),
        weather_code: current.variables(4)!.value(),
        precipitation: current.variables(5)!.value(),
      },
      hourly: {
        time: Array.from(
          {
            length:
              (Number(hourly.timeEnd()) - Number(hourly.time())) /
              hourly.interval(),
          },
          (_, i) =>
            new Date(
              (Number(hourly.time()) +
                utcOffsetSeconds +
                i * hourly.interval()) *
                1000
            )
        ),
        temperature_2m: hourly.variables(0)!.valuesArray(),
        weather_code: hourly.variables(1)!.valuesArray(),
      },
      daily: {
        time: Array.from(
          {
            length:
              (Number(daily.timeEnd()) - Number(daily.time())) /
              daily.interval(),
          },
          (_, i) =>
            new Date(
              (Number(daily.time()) + utcOffsetSeconds + i * daily.interval()) *
                1000
            )
        ),
        weather_code: daily.variables(0)!.valuesArray(),
        temperature_2m_max: daily.variables(1)!.valuesArray(),
        temperature_2m_min: daily.variables(2)!.valuesArray(),
      },
    }

    return weatherData
  } catch (error) {
    setIsError(
      "We couldn't connect to the server (API error). Please try again in a few moments."
    )
    console.error('Error fetching weather data:', error)
    return { error: 'Failed to fetch weather data' }
  }
}

export { getWeather }
