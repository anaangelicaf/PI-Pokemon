import './App.css';
import { useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Landing } from "./components/Landing";
import { Home } from './components/Home.jsx';
import { Navbar } from "./components/Navbar";

import { Create  } from './components/NewPoke.jsx';
import { getPokemons, getTypes } from "./redux/actions/actions";

import { Pokemon } from "./components/Pokemon.jsx";

function App() {
 
    const dispatch = useDispatch();
    useEffect(() => {
      dispatch(getTypes());
      dispatch(getPokemons());
    });
  
    return (
      <>
        <Navbar />
        <Route exact path="/pokemons/:id" >
          <Pokemon />
        </Route>
        <Route exact path="/">
          <Landing />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/create">
          <Create />
        </Route>
        
      </>
    );
  }
  
  export default App;