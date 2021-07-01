import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { pokemonSlice } from './pokemon/pokemonSlice'

export const store = configureStore({
  reducer: {
    pokemon: pokemonSlice.reducer,
  },
})

// Typing our global app state and dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch // What we know as ReduxDispatch

// Export typed versions of useDispatch (enables response to be inferred) and useSelector (enables state to be inferred)
export const useAppDispatch = () => useDispatch<AppDispatch>() // What we know as useReduxDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
