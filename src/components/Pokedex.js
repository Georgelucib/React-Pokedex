import React from "react";
import Pagination from "./Pagination";
import Pokemon from "./Pokemon";
import '../Style/pokedex.css'

const Pokedex = (props) => {
  const { pokemons, loading, page, setPage, totalPages } = props;

  const onLeftClickHandler = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  }
  const onRightClickHandler = () => {
    if (page + 1 !== totalPages) {
      setPage(page + 1);
    }
  }
  return (
    <div>
      <div className="pokedex-header">
        <h1>Pokedex</h1>
        <Pagination
          page={page + 1}
          totalPages={totalPages}
          onLeftClick={onLeftClickHandler}
          onRightClick={onRightClickHandler}
        />
      </div>
      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="pokedex-grid-container">
          <div className="pokedex-grid">
            {pokemons && pokemons.map((pokemon, index) => {

              return (
                <Pokemon key={index} pokemon={pokemon} />
                //Todo elemento numa lista precisa do "Key"para renderizar a otimização
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Pokedex;
