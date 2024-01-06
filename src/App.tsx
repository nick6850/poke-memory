import { fetchPokemons } from "./redux/pokemonSlice";
import { useAppDispatch } from "./redux/hooks";
import Pokemons from "./components/Pokemons";
import { useEffect } from "react";
import Styles from "./App.module.scss";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPokemons());
  }, []);

  return (
    <div className={Styles.app}>
      <Pokemons />
    </div>
  );
}

export default App;
