import React from "react";
import { POKEMON_TYPE_COLORS } from "../data/data";

function PokeCard({pokemon, trackScore}) {
  return (
    <li className="poke-card" key={pokemon.id}>
      <button className="poke-card-btn" onClick={() => trackScore(pokemon.id)}>
        <img
          className="pokemon-image"
          src={pokemon.sprite}
          alt={pokemon.name}
          // Added onError for broken sprites
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/0.png";
          }}
        />
        <span className="pokemon-name">{pokemon.name}</span>
        <div className="pokemon-types">
          {pokemon.types.map((type, index) => {
            return (
              <span
                key={index}
                className="pokemon-type"
                style={{
                  backgroundColor:
                    POKEMON_TYPE_COLORS[type] || POKEMON_TYPE_COLORS.Unknown,
                }}
              >
                {type}
              </span>
            );
          })}
        </div>
      </button>
    </li>
  );
}

export default PokeCard;
