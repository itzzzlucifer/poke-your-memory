// src/components/DifficultySelector.jsx
import React from "react";

// This component now receives 'value' (the selected text) and 'onChange' (the handler) as props
function DifficultySelector({ value, onDifficultyChange }) {
  // The handleChange function now just extracts the value and passes it up to the parent
  const handleChange = (event) => {
    const selectedValue = event.target.value; // Get the string value ('Easy', 'Medium', or 'Hard')
    // Call the prop function with the selected string value
    // The parent (App) will then handle translating this string to a number and updating its states
    if (onDifficultyChange) {
      onDifficultyChange(selectedValue);
    }
  };

  return (
    <>
      <label
        htmlFor="difficulty-select"
        style={{ marginRight: "10px", fontSize: "1.1em" }}
      >
        Select Difficulty:
      </label>
      <select
        id="difficulty-select"
        value={value} // Controlled directly by the 'value' prop received from parent
        onChange={handleChange}
      >
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
    </>
  );
}

export default DifficultySelector;
