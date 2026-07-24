import './WeatherInfo.css'

export function WeatherInfo({ scene, raw, unit }) {
  const tempSymbol = unit === 'imperial' ? '°F' : '°C'
  const windUnit = unit === 'imperial' ? 'mph' : 'm/s'

  return (
    <div className="weather-info">
      <h1 className="weather-info__city">{scene.cityName}</h1>
      <p className="weather-info__temp">
        {scene.temperature}
        {tempSymbol}
      </p>
      <p className="weather-info__description">{scene.description}</p>

      <div className="weather-info__details">
        <div className="weather-info__detail">
          <span className="weather-info__detail-label">Umidade</span>
          <span className="weather-info__detail-value">{raw.main.humidity}%</span>
        </div>
        <div className="weather-info__detail">
          <span className="weather-info__detail-label">Vento</span>
          <span className="weather-info__detail-value">
            {raw.wind.speed} {windUnit}
          </span>
        </div>
      </div>
    </div>
  )
}
