import { useState } from 'react'
import './SearchBar.css'

export function SearchBar({ onSearch, loading }) {
  const [city, setCity] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onSearch(city)
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        className="search-bar__input"
        placeholder="Digite uma cidade... (ex: Lisboa, São Paulo)"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        disabled={loading}
      />
      <button type="submit" className="search-bar__button" disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
    </form>
  )
}
