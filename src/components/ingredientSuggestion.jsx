import React, { useState, useEffect } from "react";

function IngredientSuggestion({ searchInput, onSelect }) {
  const [suggestions, setSuggestions] = useState([]);
  const [isActive, setIsActive] = useState(false);

  // get suggestions from api
  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_BASE_URL
        }/food/ingredients/autocomplete?apiKey=${
          import.meta.env.VITE_API_KEY
        }&query=${query}&number=5`
      );
      const SearchSuggestions = await response.json();
      setSuggestions(SearchSuggestions);
    } catch (error) {
      console.error(error);
    }
  };

  // reset the suggestions list on typing
  useEffect(() => {
    if (!searchInput || searchInput.trim() === "") {
      setIsActive(false);
      return;
    }
    fetchSuggestions(searchInput);
    setIsActive(true);
  }, [searchInput]);

  //option Selected
  const handleSelection = (suggestion) => {
    console.log(suggestion);
    const name = suggestion.name;
    console.log(name);
    onSelect(name);
  };

  return (
    <>
      {isActive && (
        <div className="bg-white w-full">
          <ul className="flex flex-col gap-4 justify-center">
            {suggestions.length === 0 && <li>No matching results</li>}
            {suggestions.map((suggestion, idx) => (
              <li
                key={idx}
                onClick={() => handleSelection(suggestion)}
                className="px-2 py-1 h-auto flex items-center text-sm sm:text-md hover:bg-gray-100 hover:drop-shadow-sm cursor-pointer"
              >
                {suggestion.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default IngredientSuggestion;
