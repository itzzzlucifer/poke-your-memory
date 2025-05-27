import React, { useEffect, useState } from "react";
const url = "https://pokeapi.co/api/v2/pokemon";
const POKEMON_TYPE_COLORS = {
  Normal: "#A8A77A",
  Fire: "#EE8130",
  Water: "#6390F0",
  Electric: "#F7D02C",
  Grass: "#7AC74C",
  Ice: "#96D9D6",
  Fighting: "#C22E28",
  Poison: "#A33EA1",
  Ground: "#E2BF65",
  Flying: "#A98FF3",
  Psychic: "#F95587",
  Bug: "#A6B91A",
  Rock: "#B6A136",
  Ghost: "#735797",
  Dragon: "#6F35FC",
  Steel: "#B7B7CE",
  Dark: "#705746",
  Fairy: "#D685AD",
  Stellar: "#446294",
  Unknown: "#68A090",
};

//asynchronous function for fetching the number of pokemons available
async function fetchPokemonCount() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon-species/?limit=1"
  );
  const data = await response.json(); //requesting for response in json format
  // console.log(`Total number of pokemons:${data.count}`);
  return data.count; //returns the total number of pokemons
}

function PokeList({difficulty}) {
  const [randomPokemon, setRandomPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const difficultyList = {
    'Easy': 4,
    'Medium': 8,
    'Hard': 12,
  }

  

  useEffect(() => {
    let isMounted = true;
    console.log('difficulty number: '+difficultyList[difficulty]);
    //asynchronous function for fetching the pokemons
    const fetchRandomPokemons = async () => {
      try {
        const NUMBER_OF_RANDOM_POKEMONS = await difficultyList[difficulty];
        //fetch the pokemon count by calling function
        const totalPokemonCount = await fetchPokemonCount();
        //creating a set(unique elements only) to hold a number of random Ids
        const uniqueRandomIds = new Set();

        //adding the random Ids to the set until max number reached
        while (uniqueRandomIds.size < NUMBER_OF_RANDOM_POKEMONS) {
          const id = (Math.floor(Math.random() * totalPokemonCount) + 1); //generating the random id
          uniqueRandomIds.add(id); //adding the id to the set
        }

        //mapping through each id in the set and requesting data dynamically based on it.
        const pokemonPromises = Array.from(uniqueRandomIds).map(async (id) => {
          const response = await fetch(`${url}/${id}`); //fetching the pokemon based on id and storing response.
          const data = await response.json(); //requesting the response in json format.
          return {
            id: data.id,
            name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
            sprite: data.sprites.front_default,
            types: data.types.map(
              (typeInfo) =>
                typeInfo.type.name.charAt(0).toUpperCase() +
                typeInfo.type.name.slice(1)
            ),
          };
        });
        //waiting for all promises to resolve inside pokemonPromises and storing the returned array in fetchedPokemon
        const fetchedPokemon = await Promise.all(pokemonPromises);
        console.log(fetchedPokemon);
        //updating the state of randomPokemon
        setRandomPokemon(fetchedPokemon);
      } catch (err) {
        //runs when error encountered
        console.log(`Unable to fetch pokemons\nError message:${err}`);
        setError(err);
      } finally {
        //runs when promise resolved
        setLoading(false);
      }
    };
    fetchRandomPokemons();

    return ()=>{
      isMounted = false;
    }
  }, [difficulty]);

  //show 'loading pokemon...' until the API request is not resolved
  if (loading) {
    return <p>Loading Pokemons...</p>;
  }
  //show error (if any)
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <ul className="pokemon-list">
      {randomPokemon.map((pokemon) => {
        return (
          <li className="poke-card" key={pokemon.id}>
            <img
              className="pokemon-image"
              src={pokemon.sprite}
              alt={pokemon.name}
            />
            <span className="pokemon-name">{pokemon.name}</span>
            <div className="pokemon-types">
              {pokemon.types.map((type, index) => {
                return (
                  <span
                    key={index}
                    className="pokemon-type"
                    style={{ backgroundColor: POKEMON_TYPE_COLORS[type] }}
                  >
                    {type}
                  </span>
                );
              })}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default PokeList;
