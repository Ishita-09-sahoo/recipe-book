import React, { useState, useEffect } from "react";
import Searchbar from "./searchbar";
import IngredientBtn from "./ingredientbtn";

function Searchbox({ fetchSearchInput, fetchIngredientFilter }) {
  const [finalSearch, setFinalSearch] = useState("");
  const [ingredientFilter, setIngredientFilter] = useState([]);

  // log the final search queries and pass them to homepage
  useEffect(() => {
    console.log(finalSearch);
    console.log(ingredientFilter);

    fetchSearchInput(finalSearch);
    fetchIngredientFilter(ingredientFilter);
  }, [finalSearch, ingredientFilter]);

  return (
    <div className="p-2 flex items-center bg-amber-400 shadow-md fixed w-full h-14 z-20">
      <Searchbar finalSearchInput={(recipe) => setFinalSearch(recipe)} />
      <IngredientBtn
        ingredientFilter={(ingredients) => setIngredientFilter(ingredients)}
      />
    </div>
  );
}

export default Searchbox;
