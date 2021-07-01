import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Pokemon } from './types'
import { RootState } from '../store'
import axios from 'axios'

// Thunk action creator
export const fetchPokemonByName = createAsyncThunk<Pokemon, string>(
  'pokemon/fetchByName',
  async (name, { rejectWithValue }) => {
    const { status, data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    if (status < 200 || status >= 300) {
      return rejectWithValue(data)
    }
    return data
  },
)

// Thunk request state
type RequestState = 'pending' | 'fulfilled' | 'rejected'

// Create pokemon slice and define reducers to process data and request state
export const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    dataByName: {} as Record<string, Pokemon | undefined>,
    statusByName: {} as Record<string, RequestState | undefined>,
    errorByName: {} as Record<string, string | undefined>,
  },
  reducers: {},
  extraReducers: builder => {
    // When our request is pending:
    // - store the 'pending' state as the status for the corresponding pokemon name
    builder.addCase(fetchPokemonByName.pending, (state, action) => {
      state.statusByName[action.meta.arg] = 'pending'
    })
    // When our request is fulfilled:
    // - store the 'fulfilled' state as the status for the corresponding pokemon name
    // - and store the received payload as the data for the corresponding pokemon name
    builder.addCase(fetchPokemonByName.fulfilled, (state, action) => {
      state.statusByName[action.meta.arg] = 'fulfilled'
      state.dataByName[action.meta.arg] = action.payload
    })
    // When our request is rejected:
    // - store the 'rejected' state as the status for the corresponding pokemon name
    builder.addCase(fetchPokemonByName.rejected, (state, action) => {
      state.statusByName[action.meta.arg] = 'rejected'
      state.errorByName[action.meta.arg] = action.error.message
    })
  },
})

export const selectStatusByName = (state: RootState, name: string) => state.pokemon.statusByName[name]
export const selectDataByName = (state: RootState, name: string) => state.pokemon.dataByName[name]
export const selectErrorByName = (state: RootState, name: string) => state.pokemon.errorByName[name]
