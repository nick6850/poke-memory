import { useAppSelector } from "../redux/hooks";
import { Pokemon } from "../types";
import styles from "./Pokemons.module.scss";
import { nanoid } from "@reduxjs/toolkit";

function Pokemons() {
  const pokemons: Pokemon[] = useAppSelector((state) => state.pokemon.pokemons);
  console.log(pokemons);

  const pokemonsElements = pokemons.map((pokemon) => (
    <div key={nanoid()}>
      <img src={pokemon.img} alt={pokemon.name} />
    </div>
  ));

  return <div className={styles.pokemons}>{pokemonsElements}</div>;
}

export default Pokemons;
