import React, { useState } from "react";
import "./styles.css/Search.css";
import { useSelector, useDispatch } from "react-redux";
import { filters, getByName, order, type } from "../redux/actions/actions";

export const Search = () => {
  const dispatch = useDispatch();
  const [pokemons, setPokemons] = useState("");

  const options = useSelector((store) => store.types);
  const button = "button";

  const handleInputChange = (e) => {
    setPokemons(e.target.value);
  };

  const byTipo = (e) => {
    dispatch(type(e.target.value));
  }
  
  const submit = (e) => {
    e.preventDefault();
    dispatch(getByName(pokemons));
    
    setPokemons("");
  };

  const creadoBy = (e) => {
    dispatch(filters(e.target.value))
  }

  const orderBy = (e) => {
    dispatch(order(e.target.value));
  }

  return (
    <div className="container">
      <form onSubmit={submit}>
        <div className="field">
          <input
            type="text"
            id="searchterm"
            value={pokemons}
            onChange={handleInputChange}
            placeholder="Encuentra tu pokemon..."
          />
          <input className={button} type="submit" value="Find!" />
        </div>
      </form>
      <div className="field2">
        <select className={button} name="Type" onChange={byTipo}>
          <option value="">Tipo:</option>
          {options?.map((p) => (
            <option value={p.name} key={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <select name="creado" className={button} onChange={creadoBy}>
          <option value="0">Creado por:</option>
          <option value="1">API</option>
          <option value="2">Propio</option>
        </select>
        <select name="Ordenar" className={button} onChange={orderBy}>
          <option value="">Ordenar por:</option>
          <option value="a-z">A-Z</option>
          <option value="z-a">Z-A</option>
          <option value="fuerza+">Mas Fuerte</option>
          <option value="fuerza-">Menos Fuerte</option>
        </select>
       
      </div>
    </div>
  );
};