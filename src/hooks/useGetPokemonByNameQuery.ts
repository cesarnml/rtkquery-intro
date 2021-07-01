import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/store'
import {
  fetchPokemonByName,
  selectStatusByName,
  selectDataByName,
  selectErrorByName,
} from '../store/pokemon/pokemonSlice'

export function useGetPokemonByNameQuery(name: string) {
  const dispatch = useAppDispatch()
  // select the current status from the store state for the provided name
  const status = useAppSelector(state => selectStatusByName(state, name))
  // select the current data from the store state for the provided name
  const data = useAppSelector(state => selectDataByName(state, name))
  const errorMessage = useAppSelector(state => selectErrorByName(state, name))

  useEffect(() => {
    // upon mount or name change, if status is uninitialized, send a request
    // for the pokemon name
    if (status === undefined) {
      dispatch(fetchPokemonByName(name))
    }
  }, [status, name, dispatch])

  // derive status booleans for ease of use
  const isUninitialized = status === undefined
  const isLoading = status === 'pending' || status === undefined
  const isError = status === 'rejected'
  const isSuccess = status === 'fulfilled'

  // return the import data for the caller of the hook to use
  return { data, errorMessage, isUninitialized, isLoading, isError, isSuccess }
}
