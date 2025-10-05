import React, { useState } from "react";
import SearchSuggestion from "./searchSuggestion";

function Searchbar({finalSearchInput}) {
  const [searchInput, setSearchInput] = useState("");
  const [submit, setSubmit] = useState(false);

  const handleSubmit = () => {
    setSubmit(true);
    finalSearchInput(searchInput);
  };

  return (
    <div className="absolute top-0 pt-2">
      <div className="bg-white p-2 w-40 min-[25rem]:w-52 sm:w-70 md:w-80 lg:w-96 h-10 flex items-center absolute left-6 rounded-md drop-shadow-md">
        {/* searchbar */}
        <input
          type="text"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            setSubmit(false);
            }}
            placeholder="Search Recipes"
            className="outline-none border-none focus:outline-none w-[80%] overflow-scroll"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          />

          {/* submit btn */}
        <button
          type="submit"
          onClick={() => {
            handleSubmit();
            console.log(searchInput);
          }}
          className="p-1 cursor-pointer absolute right-3 text-gray-400 hover:text-amber-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <circle
              cx="11"
              cy="11"
              r="7"
              stroke="currentColor"
              className="transition-colors duration-200 group-hover:stroke-amber-400"
            />
            <line
              x1="16.5"
              y1="16.5"
              x2="21"
              y2="21"
              stroke="currentColor"
              strokeLinecap="round"
              className="transition-colors duration-200 group-hover:stroke-amber-400"
            />
          </svg>
        </button>
      </div>

      {/* suggestion box */}
      <div className="relative">
        <SearchSuggestion searchInput={searchInput} isSubmit={submit} onSelect={(selected) => setSearchInput(selected)}/>
      </div>
    </div>
  );
}

export default Searchbar;
