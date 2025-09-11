import { useState, RefObject } from 'react'
import { usePlacesWidget } from 'react-google-autocomplete'
import styles from '../styles/SearchBar.module.scss'

type Coordinates = { latitude: number; longitude: number }

interface SearchBarProps {
  setCoordinates: (coords: Coordinates) => void
  setSearchCity: (city: string) => void
}

const SearchBar = ({ setCoordinates, setSearchCity }: SearchBarProps) => {
  const [inProgress, setInProgress] = useState(false)
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [noInputError, setNoInputError] = useState(false)

  const { ref } = usePlacesWidget({
    apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    onPlaceSelected: (place) => {
      if (place.geometry) {
        const lat = place.geometry.location.lat()
        const lng = place.geometry.location.lng()
        setLatitude(lat)
        setLongitude(lng)
        setInputValue(place.formatted_address || '')
      }
    },
    options: {
      types: ['(cities)'],
    },
  }) as { ref: RefObject<HTMLInputElement> }

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!inputValue) {
      setNoInputError(true)
    } else {
      setNoInputError(false)
      setInProgress(true)
      setSearchCity(inputValue)
      setCoordinates({ latitude: latitude, longitude: longitude })
      setInProgress(false)
    }
  }

  return (
    <form className={styles['form']} onSubmit={handleSearch}>
      <input
        ref={ref}
        className={`input-field ${noInputError ? 'error' : ''}`}
        type='text'
        placeholder={
          noInputError ? 'Please enter a location' : 'Search for a place...'
        }
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className='btn-search' type='submit' disabled={inProgress}>
        {inProgress ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}
export default SearchBar
