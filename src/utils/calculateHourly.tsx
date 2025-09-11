const calculateHourlyWeather = (hourlyData: any) => {
  const currentTime = new Date()
  const totalHoursShown = 8

  const setHourMatch = Array.from({ length: totalHoursShown }, (_, i) => {
    const hour =
      ((currentTime.getHours() + i + 1) % 24).toString().padStart(2, '0') +
      ':00'

    return hour
  })

  type HourlyWeather = {
    time: string[]
    temperature_2m: number[]
    weather_code: number[]
  }

  type Weekday = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'

  const updatedHourlyData: Record<Weekday, HourlyWeather> = {
    Mon: { time: [], temperature_2m: [], weather_code: [] },
    Tue: { time: [], temperature_2m: [], weather_code: [] },
    Wed: { time: [], temperature_2m: [], weather_code: [] },
    Thu: { time: [], temperature_2m: [], weather_code: [] },
    Fri: { time: [], temperature_2m: [], weather_code: [] },
    Sat: { time: [], temperature_2m: [], weather_code: [] },
    Sun: { time: [], temperature_2m: [], weather_code: [] },
  }

  hourlyData.time.forEach((time: string, index: number) => {
    const date = new Date(time)
    const hour = date.toTimeString().slice(0, 5) // Extract HH:MM
    const day = date.toLocaleDateString('en-US', {
      weekday: 'short',
    }) as Weekday

    if (setHourMatch.includes(hour)) {
      updatedHourlyData[day].time.push(time)
      updatedHourlyData[day].temperature_2m.push(
        hourlyData.temperature_2m[index]
      )
      updatedHourlyData[day].weather_code.push(hourlyData.weather_code[index])
    }
  })

  return updatedHourlyData
}
export { calculateHourlyWeather }
