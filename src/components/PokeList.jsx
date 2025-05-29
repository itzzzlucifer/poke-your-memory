// import React, { useEffect, useState } from "react";
// const url = "https://pokeapi.co/api/v2/pokemon";
// const POKEMON_TYPE_COLORS = {
//   Normal: "#A8A77A",
//   Fire: "#EE8130",
//   Water: "#6390F0",
//   Electric: "#F7D02C",
//   Grass: "#7AC74C",
//   Ice: "#96D9D6",
//   Fighting: "#C22E28",
//   Poison: "#A33EA1",
//   Ground: "#E2BF65",
//   Flying: "#A98FF3",
//   Psychic: "#F95587",
//   Bug: "#A6B91A",
//   Rock: "#B6A136",
//   Ghost: "#735797",
//   Dragon: "#6F35FC",
//   Steel: "#B7B7CE",
//   Dark: "#705746",
//   Fairy: "#D685AD",
//   Stellar: "#446294",
//   Unknown: "#68A090",
// };

// //asynchronous function for fetching the number of pokemons available
// async function fetchPokemonCount() {
//   const response = await fetch(
//     "https://pokeapi.co/api/v2/pokemon-species/?limit=1"
//   );
//   const data = await response.json(); //requesting for response in json format
//   // console.log(`Total number of pokemons:${data.count}`);
//   return data.count; //returns the total number of pokemons
// }

// function PokeList({currentScore,currentBestScore,difficulty, onScoreChange, onBestScoreChange }) {
//   const [randomPokemon, setRandomPokemon] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [clickedPokemonIds, setClickedPokemonIds] = useState(new Set());
//   const difficultyList = {
//     Easy: 4,
//     Medium: 8,
//     Hard: 12,
//   };
//   const clickedPokemon = new Array;
//   const trackScore = (pokemonId) => { // Accepts the pokemonId directly
//     console.log(`Clicked: ${pokemonId}`);
//     if(currentScore>=currentBestScore){
//         onBestScoreChange(currentScore+1);
//     }
//     if (clickedPokemonIds.has(pokemonId)) {
//       // LOSE CONDITION: Pokemon already clicked
//       console.log("Game Over! You clicked this Pokemon twice.");
//       // Reset game: reset score, clear clicked IDs, and potentially re-fetch/reshuffle
//       onScoreChange(0);
//       setClickedPokemonIds(new Set());
//       // Re-fetch Pokémon for a new game (or just reshuffle current ones)
//       fetchNewRandomPokemon(); // Call the helper to reset the board
//     } else {
//       // SUCCESS: New Pokemon clicked
//       const newClickedIds = new Set(clickedPokemonIds); // Create a copy of the Set
//       newClickedIds.add(pokemonId);
//       setClickedPokemonIds(newClickedIds); // Update state with the new Set

//       const newScore = currentScore + 1;
//       onScoreChange(newScore); // Update current score

//       // Notify parent about score change (if provided)
//       if (onScoreChange) {
//         onScoreChange(newScore);
//       }
      

//       // Check for win condition (all unique pokemon clicked)
//       const NUMBER_OF_RANDOM_POKEMONS = difficultyList[difficulty];
//       if (newScore === NUMBER_OF_RANDOM_POKEMONS) {
//           console.log("You win! All unique Pokemons clicked!");
//           // Handle win: update best score, maybe offer to play again
//           if (onBestScoreChange) {
//             onBestScoreChange(newScore); // Assuming best score is updated in parent
//           }
//           // Reset for new game or show victory screen
//           setCurrentScore(0);
//           setClickedPokemonIds(new Set());
//           fetchRandomPokemons();
//       } else {
//         // Reshuffle the existing pokemon without re-fetching
//         // This is crucial for memory games
//         setRandomPokemon(prevPokemon => {
//             // Create a shuffled copy of the current pokemon array
//             const shuffled = [...prevPokemon].sort(() => Math.random() - 0.5);
//             return shuffled;
//         });
//       }
//     }
//   };

//   useEffect(() => {
//     let isMounted = true;
//     console.log("difficulty number: " + difficultyList[difficulty]);
//     //asynchronous function for fetching the pokemons
//     const fetchRandomPokemons = async () => {
//       try {
//         const NUMBER_OF_RANDOM_POKEMONS = await difficultyList[difficulty];
//         //fetch the pokemon count by calling function
//         const totalPokemonCount = await fetchPokemonCount();
//         //creating a set(unique elements only) to hold a number of random Ids
//         const uniqueRandomIds = new Set();

//         //adding the random Ids to the set until max number reached
//         while (uniqueRandomIds.size < NUMBER_OF_RANDOM_POKEMONS) {
//           const id = Math.floor(Math.random() * totalPokemonCount) + 1; //generating the random id
//           uniqueRandomIds.add(id); //adding the id to the set
//         }

//         //mapping through each id in the set and requesting data dynamically based on it.
//         const pokemonPromises = Array.from(uniqueRandomIds).map(async (id) => {
//           const response = await fetch(`${url}/${id}`); //fetching the pokemon based on id and storing response.
//           const data = await response.json(); //requesting the response in json format.
//           return {
//             id: data.id,
//             name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
//             sprite: data.sprites.front_default,
//             types: data.types.map(
//               (typeInfo) =>
//                 typeInfo.type.name.charAt(0).toUpperCase() +
//                 typeInfo.type.name.slice(1)
//             ),
//           };
//         });
//         //waiting for all promises to resolve inside pokemonPromises and storing the returned array in fetchedPokemon
//         const fetchedPokemon = await Promise.all(pokemonPromises);
//         console.log(fetchedPokemon);
//         //updating the state of randomPokemon
//         setRandomPokemon(fetchedPokemon);
//       } catch (err) {
//         //runs when error encountered
//         console.log(`Unable to fetch pokemons\nError message:${err}`);
//         setError(err);
//       } finally {
//         //runs when promise resolved
//         setLoading(false);
//       }
//     };
//     fetchRandomPokemons();

//     return () => {
//       isMounted = false;
//     };
//   }, [difficulty]);

//   //show 'loading pokemon...' until the API request is not resolved
//   if (loading) {
//     return <p>Loading Pokemons...</p>;
//   }
//   //show error (if any)
//   if (error) {
//     return <p>Error: {error.message}</p>;
//   }
//   return (
//     <ul className="pokemon-list">
//       {randomPokemon.map((pokemon) => {
//         return (
//           <li className="poke-card" key={pokemon.id}>
//             <button onClick={trackScore} key={pokemon.id}>
//               <img
//                 className="pokemon-image"
//                 src={pokemon.sprite}
//                 alt={pokemon.name}
//               />
//               <span className="pokemon-name">{pokemon.name}</span>
//               <div className="pokemon-types">
//                 {pokemon.types.map((type, index) => {
//                   return (
//                     <span
//                       key={index}
//                       className="pokemon-type"
//                       style={{ backgroundColor: POKEMON_TYPE_COLORS[type] }}
//                     >
//                       {type}
//                     </span>
//                   );
//                 })}
//               </div>
//             </button>
//           </li>
//         );
//       })}
//     </ul>
//   );
// }

// export default PokeList;

import React, { useEffect, useState } from "react";
import PokeCard from "./PokeCard";
const url = "https://pokeapi.co/api/v2/pokemon";
import { POKEMON_TYPE_COLORS } from "../data/data";

async function fetchPokemonCount() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon-species/?limit=1"
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.count;
}

function PokeList({ currentScore, currentBestScore, difficulty, onScoreChange, onBestScoreChange }) {
  const [randomPokemon, setRandomPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [clickedPokemonIds, setClickedPokemonIds] = useState(new Set()); // Correctly a state variable

  // Removed: const clickedPokemon = new Array; // This was redundant

  const difficultyList = {
    Easy: 4,
    Medium: 8,
    Hard: 12,
  };

  // Helper function to fetch and set new random Pokémon
  const fetchNewRandomPokemon = async () => {
    setLoading(true);
    setError(null);
    try {
      const NUMBER_OF_RANDOM_POKEMONS = difficultyList[difficulty];
      if (NUMBER_OF_RANDOM_POKEMONS <= 0) {
        setRandomPokemon([]);
        setLoading(false);
        return;
      }

      const totalPokemonCount = await fetchPokemonCount();
      if (totalPokemonCount === 0) {
        throw new Error("Could not determine total Pokémon count or API is unreachable.");
      }

      const uniqueRandomIds = new Set();
      while (uniqueRandomIds.size < NUMBER_OF_RANDOM_POKEMONS) {
        const id = Math.floor(Math.random() * totalPokemonCount) + 1;
        uniqueRandomIds.add(id);
      }

      const pokemonPromises = Array.from(uniqueRandomIds).map(async (id) => {
        const response = await fetch(`${url}/${id}/`);
        if (!response.ok) {
          throw new Error(`Failed to fetch Pokémon with ID ${id}: ${response.status}`);
        }
        const data = await response.json();
        return {
          id: data.id,
          name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          // Added sprite fallback
          sprite: data.sprites.front_default || data.sprites.other?.['official-artwork']?.front_default,
          types: data.types.map(
            (typeInfo) =>
              typeInfo.type.name.charAt(0).toUpperCase() +
              typeInfo.type.name.slice(1)
          ),
        };
      });

      const fetchedPokemon = await Promise.all(pokemonPromises);
      // Ensure component is still mounted before setting state
      // This is handled by the isMounted flag in useEffect's calling context
      setRandomPokemon(fetchedPokemon);
      // Reset game states when new cards are fetched for a fresh game
      setClickedPokemonIds(new Set());
      onScoreChange(0); // Reset score in parent too
    } catch (err) {
      console.error(`Unable to fetch pokemons\nError message:${err}`);
      setError(err);
    } finally {
      setLoading(false);
    }
  };


  const trackScore = (pokemonId) => {
    console.log(`Clicked: ${pokemonId}`);

    if (clickedPokemonIds.has(pokemonId)) {
      // LOSE CONDITION: Pokemon already clicked
      console.log("Game Over! You clicked this Pokemon twice.");
      alert("Game Over! You clicked this Pokemon twice.");
      onScoreChange(0); // Reset current score to 0
      setClickedPokemonIds(new Set()); // Clear clicked IDs
      fetchNewRandomPokemon(); // Start a new game with new Pokémon
    } else {
      // SUCCESS: New Pokemon clicked
      const newClickedIds = new Set(clickedPokemonIds);
      newClickedIds.add(pokemonId);
      setClickedPokemonIds(newClickedIds);

      const newScore = currentScore + 1; // Use prop currentScore, calculate newScore
      onScoreChange(newScore); // Update current score in parent (only one call here)

      // Update best score in parent if current newScore surpasses it
      if (newScore > currentBestScore) {
          onBestScoreChange(newScore);
      }

      // Check for win condition (all unique pokemon clicked)
      const NUMBER_OF_RANDOM_POKEMONS = difficultyList[difficulty];
      if (newScore === NUMBER_OF_RANDOM_POKEMONS) {
        console.log("You win! All unique Pokemons clicked!");
        // Parent's onBestScoreChange should already be handled by the check above
        onScoreChange(0); // Reset current score to 0 for a fresh game
        setClickedPokemonIds(new Set()); // Clear clicked IDs
        fetchNewRandomPokemon(); // Start a new game with new Pokémon
      } else {
        // Reshuffle the existing pokemon without re-fetching
        setRandomPokemon(prevPokemon => {
          // Create a shuffled copy of the current pokemon array
          const shuffled = [...prevPokemon].sort(() => Math.random() - 0.5);
          return shuffled;
        });
      }
    }
  };

  useEffect(() => {
    let isMounted = true; // Flag for preventing state updates on unmounted component
    console.log("difficulty number: " + difficultyList[difficulty]);

    // Wrap the async call in a function to use isMounted correctly
    const initiateFetch = async () => {
      // Pass isMounted to fetchNewRandomPokemon if it needs to handle it internally,
      // or simply put isMounted checks around the setStates after fetchNewRandomPokemon resolves.
      // For simplicity, let's keep the checks in the caller as it's common.
      try {
        await fetchNewRandomPokemon();
      } catch (err) {
        if (isMounted) {
          setError(err); // Re-set error if the component is still mounted
        }
      } finally {
        if (isMounted) {
          setLoading(false); // Ensure loading is false even if error, if component mounted
        }
      }
    };

    initiateFetch(); // Call the wrapped function

    return () => {
      isMounted = false; // Cleanup: Set flag to false when component unmounts or effect cleans up
    };
  }, [difficulty]); // Depend on difficulty to re-fetch when it changes


  if (loading) {
    return <p>Loading Pokemons...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <ul className="pokemon-list">
      {randomPokemon.map((pokemon) => {
        return <PokeCard key={pokemon.id} pokemon={pokemon} trackScore={trackScore} />
      })}
    </ul>
  );
}

export default PokeList;