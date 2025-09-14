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

const getWeatherIcon = (code: number): string => {
  switch (true) {
    case code === 0:
      return currentWeatherIcons.clear
    case code >= 1 && code <= 3:
      return currentWeatherIcons.partlyCloudy
    case code === 45 || code === 48:
      return currentWeatherIcons.fog
    case code >= 51 && code <= 57:
      return currentWeatherIcons.drizzle
    case code >= 61 && code <= 67:
      return currentWeatherIcons.rain
    case code >= 71 && code <= 77:
      return currentWeatherIcons.snow
    case code >= 80 && code <= 82:
      return currentWeatherIcons.rain
    case code >= 85 && code <= 86:
      return currentWeatherIcons.snow
    case code >= 95 && code <= 99:
      return currentWeatherIcons.thunderstorm
    default:
      return currentWeatherIcons.clear
  }
}

export { getWeatherIcon }
