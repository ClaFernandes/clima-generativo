import { useEffect, useRef, useState } from 'react'
import { useWeather } from './hooks/useWeather'
import { useGeolocation } from './hooks/useGeolocation'
import { weatherToScene } from './utils/weatherToScene'
import { SearchBar } from './components/SearchBar'
import { WeatherInfo } from './components/WeatherInfo'
import { WeatherScene } from './components/WeatherScene'
import { UnitToggle } from './components/UnitToggle'
import { ThemeToggle } from './components/ThemeToggle'
import { Loading, ErrorState, EmptyState } from './components/StatusMessages'

function App() {
  // Toda a lógica no useWeather
  const { data, loading, error, unit, fetchWeather, fetchWeatherByCoords, toggleUnit } = useWeather()

  // Hook separado para localização do navegador
  const { coords, status: geoStatus } = useGeolocation()

  // Tema dark ou light
  const [theme, setTheme] = useState('dark')

  function toggleTheme() {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  // Ref para que a busca automática por geolocalização só dispare uma vez 
  const hasAutoSearchedRef = useRef(false)

  // Busca por geolocalização quando o usuário permitir
  useEffect(() => {
    if (geoStatus === 'granted' && coords && !hasAutoSearchedRef.current) {
      hasAutoSearchedRef.current = true
      fetchWeatherByCoords(coords.lat, coords.lon)
    }
  }, [geoStatus, coords, fetchWeatherByCoords])

  // Converte os dados do clima em uma cena
  const scene = data ? weatherToScene(data) : null

  // Loading
  const isWaitingForGeolocation = geoStatus === 'loading' && !data

  return (
    <div className="app" data-theme={theme}>
      <header className="app__header">
        <h2 className="app__title">Clima Generativo</h2>
        <div className="app__controls">
          <SearchBar onSearch={fetchWeather} loading={loading} />
          <UnitToggle unit={unit} onToggle={toggleUnit} disabled={loading || !data} />
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      <main className="app__stage">
        {/* Mostra um estado por vez: erro > loading > dados > vazio */}
        {error && <ErrorState message={error} />}

        {!error && (loading || isWaitingForGeolocation) && <Loading />}

        {!error && !loading && !isWaitingForGeolocation && scene && (
          <div className="app__scene-wrapper">
            <WeatherScene scene={scene} />
            <div className="app__info-overlay">
              <WeatherInfo scene={scene} raw={data} unit={unit} />
            </div>
          </div>
        )}

        {!error && !loading && !isWaitingForGeolocation && !scene && <EmptyState />}
      </main>
    </div>
  )
}

export default App
