// Janela de tempo - amanhecer/entardecer
const TWILIGHT_WINDOW_SECONDS = 60 * 60

// Verifica qual fase do dia está
function getDayPhase(dt, sunrise, sunset) {
  const distToSunrise = Math.abs(dt - sunrise)
  const distToSunset = Math.abs(dt - sunset)
  const isDaytime = dt > sunrise && dt < sunset

  if (distToSunrise < TWILIGHT_WINDOW_SECONDS) return 'dawn'
  if (distToSunset < TWILIGHT_WINDOW_SECONDS) return 'dusk'
  return isDaytime ? 'day' : 'night'
}

// Agrupa condições do tempo em categorias 
function getConditionGroup(mainCondition) {
  const rainy = ['Rain', 'Drizzle']
  const foggy = ['Mist', 'Fog', 'Haze', 'Smoke']

  if (mainCondition === 'Clear') return 'clear'
  if (mainCondition === 'Clouds') return 'clouds'
  if (rainy.includes(mainCondition)) return 'rain'
  if (mainCondition === 'Thunderstorm') return 'thunderstorm'
  if (mainCondition === 'Snow') return 'snow'
  if (foggy.includes(mainCondition)) return 'fog'

  return 'clouds'
}

// Velocidade do vento
function getCloudDriftDuration(windSpeedMs) {
  const MIN_DURATION = 12 // vento forte
  const MAX_DURATION = 45 // vento fraco/parado
  const MAX_EXPECTED_WIND = 15

  const clampedWind = Math.min(windSpeedMs, MAX_EXPECTED_WIND)
  const ratio = clampedWind / MAX_EXPECTED_WIND

  return MAX_DURATION - ratio * (MAX_DURATION - MIN_DURATION)
}

// Converte os dados do clima em uma cena
export function weatherToScene(weatherData) {
  const { dt, sys, main, weather, wind, clouds } = weatherData

  const phase = getDayPhase(dt, sys.sunrise, sys.sunset)
  const condition = getConditionGroup(weather[0].main)

  // Nebulosidade
  const cloudCount = Math.round((clouds.all / 100) * 6)

  return {
    phase,
    condition,
    temperature: Math.round(main.temp),
    description: weather[0].description,
    cloudCount,
    cloudDriftDuration: getCloudDriftDuration(wind.speed),
    windDeg: wind.deg ?? 0,
    cityName: weatherData.name,
  }
}
