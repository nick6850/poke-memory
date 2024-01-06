import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Pokemon } from "../types";
import { nanoid } from "@reduxjs/toolkit";
import arrayShuffle from "array-shuffle";

type initialState = {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: string;
};

const initialState: initialState = {
  pokemons: [],
  isLoading: false,
  error: "",
};

export const fetchPokemons = createAsyncThunk(
  "pokemon/fetchPokemons",
  async () => {
    let pokemonArr: Pokemon[] = [];
    while (pokemonArr.length < 8) {
      let random = Math.floor(Math.random() * 100) + 1;
      const res = await axios(`https://pokeapi.co/api/v2/pokemon/${random}`);
      if (!pokemonArr.find((pokemon) => pokemon.name === res.data.name)) {
        pokemonArr.push({
          name: res.data.name,
          img: res.data.sprites.other["official-artwork"].front_default,
        });
      }
    }
    pokemonArr.push(...pokemonArr);
    console.log(pokemonArr);
    return pokemonArr;
  }
);

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPokemons.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPokemons.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pokemons = action.payload as Pokemon[];
    });
    builder.addCase(fetchPokemons.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Something went wrong";
    });
  },
});

export default pokemonSlice.reducer;
