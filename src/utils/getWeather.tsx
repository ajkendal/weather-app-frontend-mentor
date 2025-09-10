import { fetchWeatherApi } from 'openmeteo'

const getWeather = async (
  latitude: number,
  longitude: number,
  isMetric: boolean
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
      'is_day',
      'wind_speed_10m',
      'weather_code',
    ],
    timezone: 'auto',
    temprerature_unit: units.temperature,
    wind_speed_unit: units.wind_speed,
    precipitation_unit: units.precipitation,
  }

  try {
    const responses = await fetchWeatherApi(url, params)
    const response = responses[0]

    const utcOffsetSeconds = response.utcOffsetSeconds()
    const current = response.current()!
    const hourly = response.hourly()!
    const daily = response.daily()!

    const weatherData = {
      current: {
        time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
        temperature_2m: current.variables(0)!.value(),
        relative_humidity_2m: current.variables(1)!.value(),
        apparent_temperature: current.variables(2)!.value(),
        is_day: current.variables(3)!.value(),
        wind_speed_10m: current.variables(4)!.value(),
        weather_code: current.variables(5)!.value(),
      },
      hourly: {
        time: [
          ...Array(
            (Number(hourly.timeEnd()) - Number(hourly.time())) /
              hourly.interval()
          ),
        ].map(
          (_, i) =>
            new Date(
              (Number(hourly.time()) +
                i * hourly.interval() +
                utcOffsetSeconds) *
                1000
            )
        ),
        temperature_2m: hourly.variables(0)!.valuesArray(),
        weather_code: hourly.variables(1)!.valuesArray(),
      },
      daily: {
        time: [
          ...Array(
            (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval()
          ),
        ].map(
          (_, i) =>
            new Date(
              (Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) *
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
    console.error('Error fetching weather data:', error)
    return { error: 'Failed to fetch weather data' }
  }
}

export { getWeather }
