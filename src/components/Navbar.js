import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link, useNavigate } from "react-router-dom";
import FavoriteContext from "../contexts/favoritesContext";
import '../Style/navbar.css'


const Navbar = (props) => {
  const { favoritePokemons } = useContext(FavoriteContext);
  const logoImg ="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";
  const [fix, setFix] = useState(false )
  function setFixed(){
    if(window.scrollY >=0){
      setFix(true)
    } else{
      setFix(false)
    }
  }

  window.addEventListener("scroll", setFixed)
 
  return (
    <nav className={fix ? 'navbar-fixed' :'navbar'}>
      <div className="navbar-container">
        <Link  className="navbar-link favorite btn" to ="/Favorites"><button className="navbar-button"> Favorited {favoritePokemons.length}</button> </Link>
        <Link to="/"><img alt="Pokeapi-logo" src={logoImg} className="navbar-img" /></Link>
        <a className="navbar-link" href="https://georgelucib.github.io/Portfolio-George/" target="_blank" > <button className="navbar-button">About me</button></a>
      </div>
    </nav>
  );
};

export default Navbar;
