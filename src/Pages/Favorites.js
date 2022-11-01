import React, {useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchPokemon } from "../api";
import { GetPoke } from "../components/GetPoke";
import Navbar from "../components/Navbar";
import Pokemon from "../components/Pokemon";
import { FavoriteProvider } from "../contexts/favoritesContext";
import Footer from "../components/Footer";
import '../Style/favorites.css'

let pokemonsFav = [];
pokemonsFav.push(...GetPoke());

function Favorites() {
  const favoritesKey = "f";
  const [pokemons, setPokemons] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  if (favorites.length > 1) {
    if (pokemonsFav.length !== favorites.length) {
      navigate(0);
    }
  }


  const loadFavoritePokemons = () => {
    const pokemons =
      JSON.parse(window.localStorage.getItem(favoritesKey)) || [];
    setFavorites(pokemons);
  };

  const fetchPokemons = async () => {
    try {
      const promises = pokemonsFav.map((element, index) => {
        return searchPokemon(element);
      });

      const results = await Promise.all(promises);
      setPokemons(results);
    } catch (error) {
      console.log("fetchPokemons error: ", error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  useEffect(() => {
    loadFavoritePokemons();
  }, []);

  const updateFavoritePokemons = (name) => {
    const updatedFavorites = [...favorites];
    const favoriteIndex = favorites.indexOf(name);
    if (favoriteIndex >= 0) {
      updatedFavorites.splice(favoriteIndex, 1);
    } else {
      updatedFavorites.push(name);
    }
    window.localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  return (
    <body>
    <FavoriteProvider
      value={{
        favoritePokemons: favorites,
        updateFavoritePokemons: updateFavoritePokemons,
      }}
    >
      <div>
        <Navbar />
        <div className="favorite-header">
          <h1>Favorites</h1>
        </div>
        <div className="pokedex-grid">
          {pokemons &&
            pokemons.map((pokemon, index) => {
              return (
                <Pokemon key={index} pokemon={pokemon} />
                //Todo elemento numa lista precisa do "Key"para renderizar a otimização
              );
            })}
        </div>
      </div>
        <Footer/>
    </FavoriteProvider>
    </body>
  );
}

export default Favorites;
