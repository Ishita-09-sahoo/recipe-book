import React, { useEffect, useState } from "react";
import XIcon from "../assets/x.svg";
import IngredientSuggestion from "./ingredientSuggestion";

function IngredientSelection({ isOpen, isDone, ingredients }) {
  const [Ingredients, setIngredients] = useState([]);
  const [SearchInput, setSearchInput] = useState("");
  const [isActive, setIsActive] = useState(false);

  //   add ingredient
  const addIngredient = (newIngredient) => {
    console.log(newIngredient);
    if (newIngredient && !Ingredients.includes(newIngredient)) {
      setIngredients([...Ingredients, newIngredient]);
    }
    setSearchInput("");
  };

  //Delete ingredient
  const deleteIngredient = (deleted) => {
    setIngredients(Ingredients.filter((ingredient) => ingredient !== deleted));
  };

  //handle Done button
  const handleDone = () => {
    ingredients(Ingredients);
    setIsActive(false);
    setSearchInput('');
    isDone();
  };

  //handle open close
  useEffect(() => {
    setIsActive(isOpen);
  }, [isOpen]);

  return (
    <>
      {isActive && (
        <div className="bg-white h-auto w-40 min-[25rem]:w-52 sm:w-70 md:w-80 lg:w-96 rounded">
          <div className="flex flex-col">
            <div className="text-sm sm:text-lg text-black flex items-center justify-between py-2 px-4">
              <div className="">Ingredients</div>
              <button
                className="cursor-pointer border border-gray-500 bg-gray-100 rounded-lg px-2 hover:drop-shadow-md"
                onClick={() => handleDone()}
              >
                Done
              </button>
            </div>
            {/* selected ingredients */}
            <div className="w-full h-fit bg-gray-100 drop-shadow-sm flex flex-wrap gap-2 p-2">
              {/* if ingredients length is 0 then <div>Add Ingredients<div/> */}
              {Ingredients.length === 0 ? (
                <div className="text-gray-500 text-sm">Add Ingredients</div>
              ) : (
                Ingredients.map((ingredient, idx) => (
                  <div
                    key={idx}
                    className="bg-white text-gray-800 text-sm px-2 py-1 h-6 rounded shadow w-fit flex items-center gap-2"
                  >
                    {ingredient}
                    <button
                      className="p-1 flex items-center justify-center cursor-pointer"
                      onClick={() => deleteIngredient(ingredient)}
                    >
                      <img src={XIcon} alt="Delete" className="h-2 w-2 " />
                    </button>
                  </div>
                ))
              )}
            </div>
            {/* search ingredients */}
            <div className="flex items-center justify-center w-full">
              <input
                type="text"
                value={SearchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                }}
                placeholder="Search Ingredients"
                className="w-full my-2 px-2 py-1 focus:outline-none border-2 border-gray-100"
              />
            </div>

            {/* autocomplete options */}
            <div className="w-full">
              <IngredientSuggestion
                searchInput={SearchInput}
                onSelect={(ingredient) => {
                  addIngredient(ingredient);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default IngredientSelection;
