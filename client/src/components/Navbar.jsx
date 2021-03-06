import React from "react";
import { Link } from "react-router-dom";
import './styles.css/Navbar.css';
import LogoPoke from './styles.css/Image/logoPoke.png'
import { useDispatch } from "react-redux";
import { getPokemons, getTypes } from "../redux/actions/actions";

export const Navbar = () => {
  const dispatch = useDispatch();
  dispatch(getTypes());
  dispatch(getPokemons());
  return (
    <div>
      <header className= "header" >
        <Link to="/" className= "logo">
          <img src={LogoPoke} alt="" />
        </Link>
        <ul>
            <li><Link to="/home">Home</Link></li>
            <li><Link to="/create" refresh="true">NewPokemons</Link></li>
            {/*<li><Link to="/team">My team</Link></li>*/}
        </ul>
        
      </header>
    </div>
  );
};