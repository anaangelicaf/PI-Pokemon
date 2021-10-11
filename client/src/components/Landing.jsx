import React from "react";
import { Link } from "react-router-dom";
import "./styles.css/Landing.css";
import Pikachu from "./styles.css/Image/pikachu.png";
export const Landing = () => {

    return (
      <div className="containerlanding">
        <div>
          <h1 className="h1">
              Welcome to the Pokemon World
          </h1>
         
          
            <img src={Pikachu} alt="" className="imgpika"/>
          
          <Link to="/home" refresh="true">
            <input type="submit" value="See Pokemon" className="myButton" />
          </Link>
  
          <h3 className="love">Realizado por Ana Fernández con &hearts; para henry</h3>
        </div>
  
        
      </div>
    );
  };