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

  type Weekday =
    | 'Monday'
    | 'Tuesday'
    | 'Wednesday'
    | 'Thursday'
    | 'Friday'
    | 'Saturday'
    | 'Sunday'

  const updatedHourlyData: Record<Weekday, HourlyWeather> = {
    Monday: { time: [], temperature_2m: [], weather_code: [] },
    Tuesday: { time: [], temperature_2m: [], weather_code: [] },
    Wednesday: { time: [], temperature_2m: [], weather_code: [] },
    Thursday: { time: [], temperature_2m: [], weather_code: [] },
    Friday: { time: [], temperature_2m: [], weather_code: [] },
    Saturday: { time: [], temperature_2m: [], weather_code: [] },
    Sunday: { time: [], temperature_2m: [], weather_code: [] },
  }

  hourlyData.time.forEach((time: string, index: number) => {
    const date = new Date(time)
    const hour = date.toTimeString().slice(0, 5) // Extract HH:MM
    const day = date.toLocaleDateString('en-US', { weekday: 'long' }) as Weekday

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
