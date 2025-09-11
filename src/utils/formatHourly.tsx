const formatHourly = (hourlyData: any) => {
  type HourlyWeather = {
    time: string[]
    temperature_2m: number[]
    weather_code: number[]
    day_code: number
    day: string
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
    Monday: {
      day_code: 1,
      day: 'Monday',
      time: [],
      temperature_2m: [],
      weather_code: [],
    },
    Tuesday: {
      day_code: 2,
      day: 'Tuesday',
      time: [],
      temperature_2m: [],
      weather_code: [],
    },
    Wednesday: {
      day_code: 3,
      day: 'Wednesday',
      time: [],
      temperature_2m: [],
      weather_code: [],
    },
    Thursday: {
      day_code: 4,
      day: 'Thursday',
      time: [],
      temperature_2m: [],
      weather_code: [],
    },
    Friday: {
      day_code: 5,
      day: 'Friday',
      time: [],
      temperature_2m: [],
      weather_code: [],
    },
    Saturday: {
      day_code: 6,
      day: 'Saturday',
      time: [],
      temperature_2m: [],
      weather_code: [],
    },
    Sunday: {
      day_code: 0,
      day: 'Sunday',
      time: [],
      temperature_2m: [],
      weather_code: [],
    },
  }

  hourlyData.time.forEach((time: string, index: number) => {
    const date = new Date(time)
    const options: Intl.DateTimeFormatOptions = { weekday: 'long' }
    const weekday = date.toLocaleDateString('en-US', options) as Weekday
    const shortTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
    })

    if (updatedHourlyData[weekday]) {
      updatedHourlyData[weekday].time.push(shortTime)
      updatedHourlyData[weekday].temperature_2m.push(
        hourlyData.temperature_2m[index]
      )
      updatedHourlyData[weekday].weather_code.push(
        hourlyData.weather_code[index]
      )
    }
  })

  const sortedHourlyData = Object.values(updatedHourlyData).sort(
    (a, b) => a.day_code - b.day_code
  )

  return sortedHourlyData
}

export { formatHourly }
