import React, { useState } from 'react'
import { Pokemon } from './components/Pokemon'

const options = ['pikachu', 'psyduck', 'charizard', 'squirtle']
export const App = () => {
  const [selectedPokemon, setSelectedPokemon] = useState<string>()

  return (
    <div>
      <label htmlFor="pokemon-select">Choose a pokemon:</label>
      <select
        name="pokemon"
        id="pokemon-select"
        value={selectedPokemon}
        onChange={e => setSelectedPokemon(e.target.value)}
      >
        {options.map(name => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
      {selectedPokemon && <Pokemon name={selectedPokemon} />}
    </div>
  )
}
