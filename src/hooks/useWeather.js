import { useState, useCallback, useRef } from 'react'

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather'

// Hook customizado para buscar o clima
export function useWeather() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [unit, setUnit] = useState('metric')

  // useRef para armazenar a última busca feita
  const lastQueryRef = useRef(null)

  // Função que faz a requisição à API
  const performFetch = useCallback(async (queryString, unitToUse) => {
    setLoading(true)
    setError(null)

    try {
      // Descrição do clima em português 
      const url = `${BASE_URL}?${queryString}&appid=${API_KEY}&units=${unitToUse}&lang=pt_br`

      const response = await fetch(url)

      // Tratamento de erros da API
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Cidade não encontrada. Verifique o nome e tente novamente.')
        }
        if (response.status === 401) {
          throw new Error('Chave de API inválida ou ainda não ativada.')
        }
        throw new Error('Não foi possível buscar o clima agora. Tente novamente.')
      }

      const json = await response.json()
      setData(json)
    } catch (err) {
      // Erros de rede
      setError(err.message || 'Erro inesperado ao buscar o clima.')
      setData(null)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchWeather = useCallback(
    (city) => {
      if (!city || !city.trim()) {
        setError('Digite o nome de uma cidade.')
        return
      }

      lastQueryRef.current = { type: 'city', value: city }
      performFetch(`q=${encodeURIComponent(city)}`, unit)
    },
    [performFetch, unit],
  )

  const fetchWeatherByCoords = useCallback(
    (lat, lon) => {
      lastQueryRef.current = { type: 'coords', lat, lon }
      performFetch(`lat=${lat}&lon=${lon}`, unit)
    },
    [performFetch, unit],
  )

  // Celsius/Fahrenheit
  const toggleUnit = useCallback(() => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric'
    setUnit(newUnit)

    const lastQuery = lastQueryRef.current
    if (!lastQuery) return

    if (lastQuery.type === 'city') {
      performFetch(`q=${encodeURIComponent(lastQuery.value)}`, newUnit)
    } else {
      performFetch(`lat=${lastQuery.lat}&lon=${lastQuery.lon}`, newUnit)
    }
  }, [unit, performFetch])

  return { data, loading, error, unit, fetchWeather, fetchWeatherByCoords, toggleUnit }
}
