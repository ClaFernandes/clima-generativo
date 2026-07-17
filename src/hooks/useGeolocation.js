import { useEffect, useState } from 'react'

// Hook customizado de geolocalização
export function useGeolocation() {
  const [coords, setCoords] = useState(null)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    // Nem todo navegador/ambiente suporta geolocalização
    if (!('geolocation' in navigator)) {
      setStatus('unsupported')
      return
    }

    setStatus('loading')

    navigator.geolocation.getCurrentPosition(
      // Sucesso: usuário permitiu
      (position) => {
        setCoords({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
        setStatus('granted')
      },
      // Erro: usuário negou a permissão, ou timeout, ou indisponível
      () => {
        setStatus('denied')
      },
      // Opções: não precisa da precisão de GPS exata, e desiste depois de 8s
      { enableHighAccuracy: false, timeout: 8000 },
    )
  }, [])

  return { coords, status }
}
