import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css/Pokemon.css";
import Stats from "./Stats.jsx";


export const Pokemon = () => {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState({});

  
  useEffect(() => {
    detalles();
  },[]);

  const detalles = async () => {
    
    const data = await fetch(`http://localhost:3001/pokemons/${id}`);
   
    const pokemon = await data.json();
   
    setPokemon(pokemon);
    
  };

  return (
    <>
      <div className="containerpokemon">
        <div className="bkg">
          <h1>{pokemon.name}</h1>
          <h2>#{pokemon.id}</h2>

          
          <div className="ima">
            <img src={pokemon.img} alt="" />
            <div className="parrafo">
              <p>peso: {pokemon.weight}kg</p>
              <p>altura: {pokemon.height}ft</p>
            </div>
          </div>
          
          <div className="type">
            
          {pokemon.type
            ? pokemon.type.map((t) => <h3 className={t}>{t}</h3>)
            : null}
            
        </div>
          
          <div className="meter">
            <div className="type-meter">
              <Stats valor={pokemon.life} nombre={"HP"} />
              <Stats valor={pokemon.attack} nombre={"Fuerza"} />
            </div>
            <div className="type-meter">
              <Stats valor={pokemon.defense} nombre={"Defensa"} />
              <Stats valor={pokemon.speed} nombre={"Velocidad"} />
            </div>
          </div>
        </div> 
      </div>
    </>
  );
};