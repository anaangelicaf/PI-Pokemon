import React from "react";
import { Link } from "react-router-dom";
import "./styles.css/Pokecard.css";

export const PokeCard = ({ array, img }) => {
  return (
    <>
      <div className="container">
        
        {array.length ? (
          array.map((p) => (
            <Link to={`/pokemons/${p.id}`} key={p.name}>
              <figure className={p.type[0]}>
                <div className="cardImageContainer">
                  <img src={p.img} alt="" className="CardImage" />
                </div>
                <figcaption className="cardCaption">
                <h2 className="cardName">#{p.id}-{p.name}</h2>
                  {p.type.length === 2 ? (
                    <div className="types">
                      <h3 className="cardType">{p.type[0]}</h3>
                      <h3 className="cardType">{p.type[1]}</h3>
                    </div>
                  ) : (
                    <div className="types">
                      <h3 className="cardType">{p.type[0]}</h3>
                    </div>
                  )}
                  
                </figcaption>
              </figure>
            </Link>
          ))
        ) : (
          <img
            src={
              array.info
                ? "https://media.giphy.com/media/UHAYP0FxJOmFBuOiC2/giphy.gif"
                : img
            }
            alt="Not found"
          />
        )}
         
      </div>
    </>
  );
};