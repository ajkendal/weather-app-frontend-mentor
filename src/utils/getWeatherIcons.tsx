const currentWeatherIcons = {
  clear: '/images/icons/icon-sunny.webp',
  partlyCloudy: '/images/icons/icon-partly-cloudy.webp',
  overcast: '/images/icons/icon-overcast.webp',
  fog: '/images/icons/icon-fog.webp',
  drizzle: '/images/icons/icon-drizzle.webp',
  rain: '/images/icons/icon-rain.webp',
  snow: '/images/icons/icon-snow.webp',
  thunderstorm: '/images/icons/icon-storm.webp',
}

const getWeatherIcon = (condition: number): string => {
  switch (condition > -1) {
    case condition === 0:
      return currentWeatherIcons.clear
    case condition >= 1 && condition <= 3:
      return currentWeatherIcons.partlyCloudy
    case condition === 45 || condition === 48:
      return currentWeatherIcons.fog
    case condition >= 51 && condition <= 57:
      return currentWeatherIcons.drizzle
    case condition >= 61 && condition <= 67:
      return currentWeatherIcons.rain
    case condition >= 71 && condition <= 77:
      return currentWeatherIcons.snow
    case condition >= 80 && condition <= 82:
      return currentWeatherIcons.rain
    case condition >= 85 && condition <= 86:
      return currentWeatherIcons.snow
    case condition >= 95 && condition <= 99:
      return currentWeatherIcons.thunderstorm
    default:
      return currentWeatherIcons.clear
  }
}

const getDay = (date: string): string => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const dayIndex = new Date(date).getDay()
  return days[dayIndex]
}

export { getWeatherIcon, getDay }
