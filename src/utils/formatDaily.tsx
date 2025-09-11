const formatDaily = (daily: any) => {
  type DailyWeather = {
    time: string
    temperature_2m_max: number
    temperature_2m_min: number
    weather_code: number
    day_code: number
  }

  const formattedDaily: Record<string, DailyWeather> = {}

  type Weekday = 'Mon' | 'Tues' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'

  daily.time.forEach((time: string, index: number) => {
    const date = new Date(time)
    const options: Intl.DateTimeFormatOptions = { weekday: 'short' }
    const weekday = date.toLocaleDateString('en-US', options) as Weekday

    if (!formattedDaily[weekday]) {
      formattedDaily[weekday] = {
        time: '',
        temperature_2m_max: 0,
        temperature_2m_min: 0,
        weather_code: 0,
        day_code: date.getDay(),
      }
    }

    formattedDaily[weekday].time = time
    formattedDaily[weekday].temperature_2m_max = daily.temperature_2m_max[index]
    formattedDaily[weekday].temperature_2m_min = daily.temperature_2m_min[index]
    formattedDaily[weekday].weather_code = daily.weather_code[index]
  })

  const sortedFormattedDaily = Object.values(formattedDaily).sort(
    (a, b) => a.day_code - b.day_code
  )

  return sortedFormattedDaily
}

export { formatDaily }
