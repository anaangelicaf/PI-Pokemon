import React, { useState } from "react";
import "./styles.css/Home.css";
import { PokeCard } from "./PokeCard";
import { Search } from "./Search";
import { useSelector } from "react-redux";
import { ordered, tipos } from "../helpers/filtros";

export const Home = () => {
  
  let pokemons = useSelector((store) => store.pokemons);
  const type = useSelector((store) => store.type);
  const order = useSelector((store) => store.order);

  if (type) pokemons = tipos(type, pokemons);
  if (order) pokemons = ordered(order, pokemons);

  const [page, setPage] = useState(0);

  const pagination = () => {
    if (pokemons.length) return pokemons.slice(page, page + 10);
    if (pokemons.info) return pokemons;
    return [];
  };

  const array = pagination();

  const nextPage = () => {
    if (pokemons.length > page + 10) {
      setPage(page + 10);
    }
  };

  const previusPage = () => {
    if (page > 0) {
      setPage(page - 10);
    }
  };

  return (
    <div className="containerhome">
      <Search />
      <div className="botones">
        <button onClick={previusPage} className="pages">
          &laquo; Previus
        </button>
        <button onClick={nextPage} className="pages">
          Next &raquo;
        </button>
      </div>
      <PokeCard
        array={array}
        img={"https://c.tenor.com/F30e8arYkdYAAAAC/pokemon-spinning.gif"}
      />
    </div>
  );
};