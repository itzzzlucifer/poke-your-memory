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
        alert("You win! All unique Pokemons clicked!");
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