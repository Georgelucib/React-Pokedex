import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FavoriteProvider } from "../contexts/favoritesContext";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { AiFillHeart } from 'react-icons/ai';
import { AiOutlineHeart } from 'react-icons/ai';
import '../Style/details.css'
import '../App.css'


function Details() {
  let typeColor = "";
  let typeColor2 = "";
  const { id } = useParams();
  const favoritesKey = "f";
  let resultColor = ""
  let pokemonImg = "";
  let pokemonTypes = [];
  let abilities = [];
  let hiddenAbility = "";
  let baseStats = []
  let weakness = [];
  let type1 = [];
  let type2 = [];



  const [favorites, setFavorites] = useState([]);
  const [pokemon, setPokemon] = useState([]);





  function findWeakness(type1, type2) {

    weakness = type1.map((num, idx) => {
      return num * type2[idx]
    })
  }

  function resultWeaknessColor(i) {
    if (weakness[i] === 0) {
      return resultColor = "#2E3436"
    }
    if (weakness[i] === 2) {
      return resultColor = "#4E9A06"
    }
    if (weakness[i] === 0.5) {
      return resultColor = "#A40000"
    }
    if (weakness[i] === 0.25) {
      return resultColor = "#7C0000"
    }
    if (weakness[i] === 4) {
      return resultColor = "#73D216"
    }

  }

  function resultNoWeakness(i) {
    if (weakness[i] === 1) {
      return resultColor = "black"
    }
  }

  const fetchPokemon = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
      const dataJson = await response.json();
      setPokemon(dataJson);
    } catch (error) {
      console.log("fetchPokemons error: ", error);
    }
  };

  useEffect(() => {

    fetchPokemon();
  }, []);

  const loadFavoritePokemons = () => {
    const pokemons =
      JSON.parse(window.localStorage.getItem(favoritesKey)) || [];
    setFavorites(pokemons);
  };

  useEffect(() => {
    loadFavoritePokemons();
  }, []);

  if (pokemon !== undefined && pokemon.length !== 0) {
    pokemonImg = pokemon.sprites.other["official-artwork"].front_default;
    if (pokemon.types.length === 2) {
      pokemonTypes.push(pokemon.types[0].type.name);
      pokemonTypes.push(pokemon.types[1].type.name);
    } else {
      pokemonTypes.push(pokemon.types[0].type.name);
    }

    pokemon.abilities.map((ability, index) => {
      if (ability.is_hidden === false) {
        abilities.push(ability.ability.name);

      } else if (ability) {
        hiddenAbility = ability.ability.name;

      }
    });

    pokemon.stats.map((stats, i) => {
      baseStats.push(stats.base_stat)
    })

    if (pokemonTypes.length > 1) {

      switch (pokemonTypes[0]) {
        case "fire":
          type1 = [1, 1, 1, 1, 2, 2, 0.5, 1, 0.5, 0.5, 2, 0.5, 1, 1, 0.5, 1, 1, 0.5];
          break;
        case "grass":
          type1 = [1, 1, 2, 2, 0.5, 1, 2, 1, 1, 2, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1];
          break;
        case "electric":
          type1 = [1, 1, 0.5, 1, 2, 1, 1, 1, 0.5, 1, 1, 1, 0.5, 1, 1, 1, 1, 1];
          break;
        case "water":
          type1 = [1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0.5, 0.5, 2, 2, 1, 0.5, 1, 1, 1];
          break;
        case "ground":
          type1 = [1, 1, 1, 0.5, 1, 0.5, 1, 1, 1, 1, 2, 2, 0, 1, 2, 1, 1, 1];
          break;
        case "fairy":
          type1 = [1, 0.5, 1, 2, 1, 1, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 0, 0.5, 1];
          break;
        case "poison":
          type1 = [1, 0.5, 1, 0.5, 2, 1, 0.5, 1, 1, 1, 1, 0.5, 1, 2, 1, 1, 1, 0.5];
          break;
        case "bug":
          type1 = [1, 0.5, 2, 1, 0.5, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1, 1, 1, 1];
          break;
        case "dragon":
          type1 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0.5, 0.5, 0.5, 1, 2, 2, 1, 2];
          break;
        case "psychic":
          type1 = [1, 0.5, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 0.5, 1, 1, 2, 1]
          break;
        case "flying":
          type1 = [1, 0.5, 1, 1, 0, 2, 0.5, 1, 1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1];
          break;
        case "fighting":
          type1 = [1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0.5, 2];
          break;
        case "normal":
          type1 = [1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
          break;
        case "ice":
          type1 = [1, 2, 1, 1, 1, 2, 1, 1, 2, 2, 1, 1, 1, 1, 0.5, 1, 1, 1]
          break;
        case "rock":
          type1 = [0.5, 2, 0.5, 0.5, 2, 1, 1, 1, 2, 0.5, 2, 2, 1, 1, 1, 1, 1, 1];
          break;
        case "ghost":
          type1 = [0, 0, 1, 0.5, 1, 1, 0.5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1];
          break;
        case "dark":
          type1 = [1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 0, 1, 1, 0.5, 2]
          break;
        case "steel":
          type1 = [0.5, 2, 0.5, 0, 2, 0.5, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 1, 0.5];
          break;
      }


      switch (pokemonTypes[1]) {
        case "fire":
          type2 = [1, 1, 1, 1, 2, 2, 0.5, 1, 0.5, 0.5, 2, 0.5, 1, 1, 0.5, 1, 1, 0.5];
          break;
        case "grass":
          type2 = [1, 1, 2, 2, 0.5, 1, 2, 1, 1, 2, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1];
          break;
        case "electric":
          type2 = [1, 1, 0.5, 1, 2, 1, 1, 1, 0.5, 1, 1, 1, 0.5, 1, 1, 1, 1, 1];
          break;
        case "water":
          type2 = [1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0.5, 0.5, 2, 2, 1, 0.5, 1, 1, 1];
          break;
        case "ground":
          type2 = [1, 1, 1, 0.5, 1, 0.5, 1, 1, 1, 1, 2, 2, 0, 1, 2, 1, 1, 1];
          break;
        case "fairy":
          type2 = [1, 0.5, 1, 2, 1, 1, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 0, 0.5, 1];
          break;
        case "poison":
          type2 = [1, 0.5, 1, 0.5, 2, 1, 0.5, 1, 1, 1, 1, 0.5, 1, 2, 1, 1, 1, 0.5];
          break;
        case "bug":
          type2 = [1, 0.5, 2, 1, 0.5, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1, 1, 1, 1];
          break;
        case "dragon":
          type2 = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0.5, 0.5, 0.5, 1, 2, 2, 1, 2];
          break;
        case "psychic":
          type2 = [1, 0.5, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 0.5, 1, 1, 2, 1]
          break;
        case "flying":
          type2 = [1, 0.5, 1, 1, 0, 2, 0.5, 1, 1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1];
          break;
        case "fighting":
          type2 = [1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0.5, 2];
          break;
        case "normal":
          type2 = [1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
          break;
        case "ice":
          type2 = [1, 2, 1, 1, 1, 2, 1, 1, 2, 2, 1, 1, 1, 1, 0.5, 1, 1, 1]
          break;
        case "rock":
          type2 = [0.5, 2, 0.5, 0.5, 2, 1, 1, 1, 2, 0.5, 2, 2, 1, 1, 1, 1, 1, 1];
          break;
        case "ghost":
          type2 = [0, 0, 1, 0.5, 1, 1, 0.5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1];
          break;
        case "dark":
          type2 = [1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 0, 1, 1, 0.5, 2]
          break;
        case "steel":
          type2 = [0.5, 2, 0.5, 0, 2, 0.5, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 1, 0.5];
          break;
      }

      findWeakness(type1, type2)

    }
    if (pokemonTypes.length === 1) {
      switch (pokemonTypes[0]) {
        case "fire":
          weakness = [1, 1, 1, 1, 2, 2, 0.5, 1, 0.5, 0.5, 2, 0.5, 1, 1, 0.5, 1, 1, 0.5];
          break;
        case "grass":
          weakness = [1, 1, 2, 2, 0.5, 1, 2, 1, 1, 2, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1];
          break;
        case "electric":
          weakness = [1, 1, 0.5, 1, 2, 1, 1, 1, 0.5, 1, 1, 1, 0.5, 1, 1, 1, 1, 1];
          break;
        case "water":
          weakness = [1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0.5, 0.5, 2, 2, 1, 0.5, 1, 1, 1];
          break;
        case "ground":
          weakness = [1, 1, 1, 0.5, 1, 0.5, 1, 1, 1, 1, 2, 2, 0, 1, 2, 1, 1, 1];
          break;
        case "fairy":
          weakness = [1, 0.5, 1, 2, 1, 1, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 0, 0.5, 1];
          break;
        case "poison":
          weakness = [1, 0.5, 1, 0.5, 2, 1, 0.5, 1, 1, 1, 1, 0.5, 1, 2, 1, 1, 1, 0.5];
          break;
        case "bug":
          weakness = [1, 0.5, 2, 1, 0.5, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1, 1, 1, 1];
          break;
        case "dragon":
          weakness = [1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0.5, 0.5, 0.5, 1, 2, 2, 1, 2];
          break;
        case "psychic":
          weakness = [1, 0.5, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 0.5, 1, 1, 2, 1]
          break;
        case "flying":
          weakness = [1, 0.5, 1, 1, 0, 2, 0.5, 1, 1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1];
          break;
        case "fighting":
          weakness = [1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 1, 1, 1, 2, 1, 1, 0.5, 2];
          break;
        case "normal":
          weakness = [1, 2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
          break;
        case "ice":
          weakness = [1, 2, 1, 1, 1, 2, 1, 1, 2, 2, 1, 1, 1, 1, 0.5, 1, 1, 1]
          break;
        case "rock":
          weakness = [0.5, 2, 0.5, 0.5, 2, 1, 1, 1, 2, 0.5, 2, 2, 1, 1, 1, 1, 1, 1];
          break;
        case "ghost":
          weakness = [0, 0, 1, 0.5, 1, 1, 0.5, 2, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1];
          break;
        case "dark":
          weakness = [1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1, 0, 1, 1, 0.5, 2]
          break;
        case "steel":
          weakness = [0.5, 2, 0.5, 0, 2, 0.5, 0.5, 1, 0.5, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 1, 0.5];
          break;
      }

    }


    switch (pokemonTypes[0]) {
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


  }


  const onHeartClick = () => {
    updateFavoritePokemons(pokemon.name);
  };
  const heart = favorites.includes(pokemon.name) ? <AiFillHeart className="icon-heart  icon-redheart"/> : <AiOutlineHeart className="icon-heart"/>;

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
          <div className="details-header">
            <h1>{pokemon.name}</h1>
          </div>
          <div style={{ backgroundColor: typeColor }} className="details-container">
            <div className="details-image-container">
              <div className="details-image">
                <img
                  alt={pokemon.name}
                  src={pokemonImg}
                  className="pokemon-details-image"
                />
                <div className="details-btn-container">
                  <button className="details-heart-btn" onClick={onHeartClick}>
                    {heart}
                  </button>
                </div>
              </div>
            </div>
            <div className="details-data-container">

              <h2>Pokedex Data</h2>
              <div className="details-data">
                <div className="details-stats-flex ">

                  <div> National Nº</div>
                  <div>{pokemon.id}</div>
                </div>
                <hr />
                <div className="details-stats-flex ">
                  <div>Type</div>


                  {pokemonTypes.map((type, i) => {
                    switch (type) {
                      case "fire":
                        typeColor2 = "#FF4422";
                        break;
                      case "grass":
                        typeColor2 = "#77cc55";
                        break;
                      case "electric":
                        typeColor2 = "#ffcc33";
                        break;
                      case "water":
                        typeColor2 = "#3399FF";
                        break;
                      case "ground":
                        typeColor2 = "#ddbb55";
                        break;
                      case "fairy":
                        typeColor2 = "#ee99ee";
                        break;
                      case "poison":
                        typeColor2 = "#aa5599";
                        break;
                      case "bug":
                        typeColor2 = "#aabb22";
                        break;
                      case "dragon":
                        typeColor2 = "#7766ee";
                        break;
                      case "psychic":
                        typeColor2 = "#ff5599";
                        break;
                      case "flying":
                        typeColor2 = "#8899ff";
                        break;
                      case "fighting":
                        typeColor2 = "#bb5544";
                        break;
                      case "normal":
                        typeColor2 = "#AAAA99";
                        break;
                      case "ice":
                        typeColor2 = "#66ccff";
                        break;
                      case "rock":
                        typeColor2 = "#bbaa66";
                        break;
                      case "ghost":
                        typeColor2 = "#6666bb";
                        break;
                      case "dark":
                        typeColor2 = "#775544";
                        break;
                      case "steel":
                        typeColor2 = "#aaaabb";
                        break;
                    }
                    return (
                      <div style={{ backgroundColor: typeColor2 }} key={i} className="details-data-type">
                        {" "}
                        {type}{" "}
                      </div>
                    );
                  })}

                </div>
                <hr />
                <div className="details-stats-flex ">
                  <div>
                    Weight
                  </div>
                  <div>
                    {pokemon.weight / 10} kg
                  </div>
                </div>
                <hr />
                <div className="details-stats-flex ">
                  <div>
                    Height
                  </div>
                  <div>
                    {pokemon.height / 10} m
                  </div>
                </div>

                <hr />
                <div className="details-stats-flex ">
                  <div>
                    Abilities
                  </div>

                  {abilities.map((ability, i) => {
                    return (
                      <div className="" key={i}>
                        {" "}
                        {ability}
                      </div>
                    );
                  })}
                </div>
                <hr />
                <div className="details-stats-flex ">
                  <div>
                    HiddenAbility
                  </div>
                  <div>
                    {hiddenAbility}
                  </div>
                </div>
              </div>
            </div>
            <div className="details-stats">
              <h2>Base Stats</h2>
              <div className="details-bar">
                <div className="bar">
                  <div className="info">
                    <span>HP - {baseStats[0]} </span>
                  </div>
                  <div className="progress-line">
                    <span style={{ background: typeColor, width: Math.floor(baseStats[0] * 100 / 200) + "%" }}></span>
                  </div>
                </div>
                <div className="bar">
                  <div className="info">
                    <span>Attack - {baseStats[1]}</span>
                  </div>
                  <div className="progress-line">
                    <span style={{ background: typeColor, width: Math.floor(baseStats[1] * 100 / 200) + "%" }}></span>
                  </div>
                </div>
                <div className="bar">
                  <div className="info">
                    <span>Defense - {baseStats[2]}</span>
                  </div>
                  <div className="progress-line">
                    <span style={{ background: typeColor, width: Math.floor(baseStats[2] * 100 / 200) + "%" }}></span>
                  </div>
                </div>
                <div className="bar">
                  <div className="info">
                    <span >Sp.Atk - {baseStats[3]}</span>
                  </div>
                  <div className="progress-line">
                    <span style={{ background: typeColor, width: Math.floor(baseStats[3] * 100 / 200) + "%" }}></span>
                  </div>
                </div>
                <div className="bar">
                  <div className="info">
                    <span>Sp.Def - {baseStats[4]}</span>
                  </div>
                  <div className="progress-line">
                    <span style={{ background: typeColor, width: Math.floor(baseStats[4] * 100 / 200) + "%" }}></span>
                  </div>
                </div>
                <div className="bar">
                  <div className="info">
                    <span>Speed - {baseStats[5]}</span>
                  </div>
                  <div className="progress-line">
                    <span style={{ background: typeColor, width: Math.floor(baseStats[5] * 100 / 200) + "%" }}></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="weakness-type-container">
              <h2>Type Defenses</h2>
              <div className="weakness-type-grid">
                <div><span className="weakness-type normal">Normal</span><span style={{ color: resultNoWeakness(0), backgroundColor: resultWeaknessColor(0) }} className="weakness-type-result">{weakness[0]}x</span></div>
                <div><span className="weakness-type fighting">fighting</span><span style={{ color: resultNoWeakness(1), backgroundColor: resultWeaknessColor(1) }} className="weakness-type-result">{weakness[1]}x</span></div>
                <div><span className="weakness-type flying">flying</span><span style={{ color: resultNoWeakness(2), backgroundColor: resultWeaknessColor(2) }} className="weakness-type-result">{weakness[2]}x</span></div>
                <div><span className="weakness-type poison">poison</span><span style={{ color: resultNoWeakness(3), backgroundColor: resultWeaknessColor(3) }} className="weakness-type-result">{weakness[3]}x</span></div>
                <div><span className="weakness-type ground">ground</span><span style={{ color: resultNoWeakness(4), backgroundColor: resultWeaknessColor(4) }} className="weakness-type-result">{weakness[4]}x</span></div>
                <div><span className="weakness-type rock">rock</span><span style={{ color: resultNoWeakness(5), backgroundColor: resultWeaknessColor(5) }} className="weakness-type-result">{weakness[5]}x</span></div>
                <div><span className="weakness-type bug">bug</span><span style={{ color: resultNoWeakness(6), backgroundColor: resultWeaknessColor(6) }} className="weakness-type-result">{weakness[6]}x</span></div>
                <div><span className="weakness-type ghost">ghost</span><span style={{ color: resultNoWeakness(7), backgroundColor: resultWeaknessColor(7) }} className="weakness-type-result">{weakness[7]}x</span></div>
                <div><span className="weakness-type steel">steel</span><span style={{ color: resultNoWeakness(8), backgroundColor: resultWeaknessColor(8) }} className="weakness-type-result">{weakness[8]}x</span> </div>
                <div><span className="weakness-type fire">fire</span><span style={{ color: resultNoWeakness(9), backgroundColor: resultWeaknessColor(9) }} className="weakness-type-result">{weakness[9]}x</span></div>
                <div><span className="weakness-type water">water</span><span style={{ color: resultNoWeakness(10), backgroundColor: resultWeaknessColor(10) }} className="weakness-type-result">{weakness[10]}x</span></div>
                <div><span className="weakness-type grass">grass</span><span style={{ color: resultNoWeakness(11), backgroundColor: resultWeaknessColor(11) }} className="weakness-type-result">{weakness[11]}x</span></div>
                <div><span className="weakness-type electric">electric</span><span style={{ color: resultNoWeakness(12), backgroundColor: resultWeaknessColor(12) }} className="weakness-type-result">{weakness[12]}x</span></div>
                <div><span className="weakness-type psychic">psychic</span><span style={{ color: resultNoWeakness(13), backgroundColor: resultWeaknessColor(13) }} className="weakness-type-result">{weakness[13]}x</span></div>
                <div><span className="weakness-type ice">ice</span><span style={{ color: resultNoWeakness(14), backgroundColor: resultWeaknessColor(14) }} className="weakness-type-result">{weakness[14]}x</span></div>
                <div><span className="weakness-type dragon">dragon</span><span style={{ color: resultNoWeakness(15), backgroundColor: resultWeaknessColor(15) }} className="weakness-type-result">{weakness[15]}x</span></div>
                <div><span className="weakness-type dark">dark</span><span style={{ color: resultNoWeakness(16), backgroundColor: resultWeaknessColor(16) }} className="weakness-type-result">{weakness[16]}x</span></div>
                <div><span className="weakness-type fairy">fairy</span><span style={{ color: resultNoWeakness(17), backgroundColor: resultWeaknessColor(17) }} className="weakness-type-result">{weakness[17]}x</span></div>
              </div>
            </div>
          </div>
        <Footer />
        </div>
      </FavoriteProvider>
    </body>
  );
}

export default Details;
