import React, { useState, useEffect } from "react";

function SearchSuggestion({ searchInput, isSubmit, onSelect, searchOn }) {
  const [suggestions, setSuggestions] = useState([]);
  const [isActive, setIsActive] = useState(false);
// const [recipeSelected, setRecipeSelected] = useState({ });

  // fetch suggestion from api
  const fetchSuggestions = async (query) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/recipes/autocomplete?apiKey=${
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

  //option selected
  const handleSelection = (suggestion) => {
    onSelect(suggestion.title);
    setIsActive(false);
  }

  useEffect(() => {
    if (isSubmit || !searchOn) {
      setIsActive(false);
    }
  }, [isSubmit, searchOn]);

  return (
    <>
      {isActive && (
        <div className="bg-white mt-2 p-2 w-40 min-[25rem]:w-52 sm:w-70 md:w-80 lg:w-96 absolute left-6 top-10 rounded-md drop-shadow-xl">
          <ul className="flex flex-col gap-4 justify-center">
            {suggestions.length === 0 && (
                <li>No matching results</li>
            )}
            {suggestions.map((suggestion, idx) => (
              <li
                key={idx}
                onClick={() => handleSelection(suggestion)}
                className="px-2 py-1 h-auto flex items-center text-sm sm:text-md lg:text-lg hover:bg-gray-100 hover:drop-shadow-sm cursor-pointer"
              >
                {suggestion.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default SearchSuggestion;
