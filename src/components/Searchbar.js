import React from "react";
import { useState, useEffect } from "react";
import { BsSearch } from 'react-icons/bs';
import '../Style/searchbar.css'

const Searchbar = (props) => {
  const [pokemons, setPokemons] = useState([]);
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [search, setSearch] = useState("ditto");
  const { onSearch } = props;
  useEffect(() => {
    const loadPokes = async () => {
        let x = []
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
        .then((response) => response.json())
        for (let index = 0; index < response.results.length; index++) {
            x.push(response.results[index].name)
            setPokemons(x)
        }
     

    };
    loadPokes();
  }, []);
  const onSuggestHandler = (text) => {
    setText(text)
    setSuggestions([]);
}

  const onButtonClickHandler = () => {
    const textLowerCase = text.toLowerCase()
    onSearch(textLowerCase);
  };
  const onChangePokeHandler = (text)=>{
      setSearch(text)
      let matches = []
      if (text.length === 0) {
        onSearch(undefined);
      }
      if(text.length > 0 ){
        matches = pokemons.filter(pokemons =>{
        
            const regex = new RegExp(`${text}`, "gi")
            return pokemons.toString().match(regex)
        })
      }

      setSuggestions(matches)
      setText(text)
  }

  return (
    <div className="searchbar-container">
      <div className="searchbar">
        <input
          value={text}
          list="list"
          placeholder="Search Pokemon"
          onChange={e=> onChangePokeHandler(e.target.value)}
        />
        {suggestions && suggestions.map((suggestion, i)=>
        <div onClick={()=> onSuggestHandler(suggestion)} className="suggestion" key={i}>
        {suggestion}
        </div>
        )}
      </div>
      <div className="searchbar-btn">
        <button onClick={onButtonClickHandler}><BsSearch/></button>
      </div>
    </div>
  );
};

export default Searchbar;
