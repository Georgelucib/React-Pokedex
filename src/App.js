import { HashRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react'

import Home from './Pages/Home'
import Favorites from './Pages/Favorites'
import Details from "./Pages/Details"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route  path="/Favorites" element={<Favorites/>}/>
          <Route path="/pokemon/:id" element={<Details />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
