import React from 'react'
import { useGetPokemonByNameQuery } from '../hooks'

type Props = {
  name: string
}

export const Pokemon = ({ name }: Props) => {
  const { data, errorMessage, isError, isLoading } = useGetPokemonByNameQuery(name)

  if (isError) {
    return (
      <div>
        <div>Oh no an error ocurred.</div>
        <div>With error message: {errorMessage}</div>{' '}
      </div>
    )
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (data) {
    return (
      <div>
        <h3>{data.species.name}</h3>
        <img src={data.sprites.front_shiny} alt={data.species.name} />
      </div>
    )
  }

  return null
}
