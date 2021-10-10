import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles.css/Pokemon.css";
import Stats from "./Stats.jsx";
import { useDispatch } from "react-redux";
import { getPokemons } from "../redux/actions/actions";

export const Pokemon = () => {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState({});
  const dispatch = useDispatch();
  
  useEffect(() => {
    detalles();
  },[]);

  const detalles = async () => {
    
    const data = await fetch(`http://localhost:3001/pokemons/${id}`);
   
    const pokemon = await data.json();
   
    setPokemon(pokemon);
    
  };
  const submit = async (e) => {
    
    e.preventDefault();
    
    if ((id.toString().length) > 10){
      
      try{
        await fetch(`http://localhost:3001/pokemons/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        dispatch(getPokemons());
        alert("Pokemon Eliminado")
      }catch{
        dispatch(getPokemons());
        alert("Pokemon no se puede Eliminar")
      } 
    } else{
      dispatch(getPokemons());
      alert("Pokemon no se puede Eliminar es de la API")
    }
  };

  return (
    <>
      <div className="containerpokemon">
      <form action="DELETE" className="bkg" onSubmit={submit}>
      
          <h1>{pokemon.name}</h1>
          <h2>#{pokemon.id}</h2>

          
          <div className="ima">
            <img src={pokemon.img} alt="" />
            <div className="parrafo">
              <p>peso: {pokemon.weight}kg</p>
              <p>altura: {pokemon.height}ft</p>
            </div>

            <div className="eliminar">
            <input type="submit" value="Delete" className="submit" />
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
         
        </form>
      </div>
    </>
  );
};