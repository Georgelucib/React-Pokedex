import React, { useContext } from "react";
import FavoriteContext from "../contexts/favoritesContext";
import { Link } from "react-router-dom";
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import '../Style/pokemon.css'

const Pokemon = (props) => {
  const { favoritePokemons, updateFavoritePokemons } = useContext(
    FavoriteContext
  );
  const { pokemon } = props;
  const heart = favoritePokemons.includes(pokemon.name) ? <AiFillHeart className="icon-heart  icon-redheart"/> : <AiOutlineHeart className="icon-heart"/>;
  let pokemonType = pokemon.types[0].type.name;
  let typeColor = "";
  switch (pokemonType) {
    case "fire":
      typeColor = "#FF4422";
      break;
    case "grass":
      typeColor = "#77cc55";
      break;
    case "electric":
      typeColor = "#ffcc33";
      break;
    case "water":
      typeColor = "#3399FF";
      break;
    case "ground":
      typeColor = "#ddbb55";
      break;
    case "fairy":
      typeColor = "#ee99ee";
      break;
    case "poison":
      typeColor = "#aa5599";
      break;
    case "bug":
      typeColor = "#aabb22";
      break;
    case "dragon":
      typeColor = "#7766ee";
      break;
    case "psychic":
      typeColor = "#ff5599";
      break;
    case "flying":
      typeColor = "#8899ff";
      break;
    case "fighting":
      typeColor = "#bb5544";
      break;
    case "normal":
      typeColor = "#AAAA99";
      break;
    case "ice":
      typeColor = "#66ccff";
      break;
    case "rock":
      typeColor = "#bbaa66";
      break;
    case "ghost":
      typeColor = "#6666bb";
      break;
    case "dark":
      typeColor = "#775544";
      break;
    case "steel":
      typeColor = "#aaaabb";
      break;
  }

  const onHeartClick = () => {
    updateFavoritePokemons(pokemon.name);
  };

  
  return (
    <div className="container-main">
    
      <div style={{ backgroundColor: typeColor }} className="pokemon-card">
        <Link to={`/pokemon/${pokemon.id}`} className="pokemon-image-container link-pokemon">
          <img
            alt={pokemon.name}
            src={pokemon.sprites.other["official-artwork"].front_default}
            className="pokemon-image"
          />
        </Link>

        <Link to={`/pokemon/${pokemon.id}`} className="card-body link-pokemon">
          <div className="card-top">
            <h3>{pokemon.name}</h3>
          </div>
          <div className="card-bottom">
            <div className="pokemon-type">
              {pokemon.types.map((type, index) => {
                return (
                  <div key={index} className="pokemon-type-text">
                    {type.type.name}
                  </div>
                );
              })}
            </div>
          </div>
        </Link>

        <button className="pokemon-heart-btn" onClick={onHeartClick}>
          {heart}
        </button>
      </div>
    </div>
  );
};

export default Pokemon;
