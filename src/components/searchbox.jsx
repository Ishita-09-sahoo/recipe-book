import React, { useState, useEffect } from "react";
import Searchbar from "./searchbar";
import IngredientBtn from "./ingredientbtn";

function Searchbox({ fetchSearchInput, fetchIngredientFilter }) {
  const [finalSearch, setFinalSearch] = useState("");
  const [ingredientFilter, setIngredientFilter] = useState([]);
  // const [results, setResults] = useState([]);

  // log the final search queries and pass them to homepage
  useEffect(() => {
    console.log(finalSearch);
    console.log(ingredientFilter);

    fetchSearchInput(finalSearch);
    fetchIngredientFilter(ingredientFilter);
    // // call search api
    // const fetchResults = async () => {
    //   try {
    //     var url = `${
    //       import.meta.env.VITE_BASE_URL
    //     }/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}`;

    //     //default when both empty
    //     if (finalSearch === "" && ingredientFilter.length === 0) {
    //       url = `${import.meta.env.VITE_BASE_URL}/recipes/random?apiKey=${
    //         import.meta.env.VITE_API_KEY
    //       }`;
    //     }

    //     if (finalSearch !== "") {
    //       url += `&query=${finalSearch}`;
    //     }
    //     if (ingredientFilter.length !== 0) {
    //       url += `&includeIngredients=${ingredientFilter.join(",")}`;
    //     }

    //     const response = await fetch(url);
    //     const data = await response.json();
    //     setResults(data.results);
    //     console.log(data);        
    //     console.log(results);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // fetchResults();
    
  }, [finalSearch, ingredientFilter, fetchIngredientFilter, fetchSearchInput]);

  return (
    <div className="p-2 flex items-center bg-amber-400 shadow-md relative w-full h-14">
      <Searchbar finalSearchInput={(recipe) => setFinalSearch(recipe)} />
      <IngredientBtn
        ingredientFilter={(ingredients) => setIngredientFilter(ingredients)}
      />
    </div>
  );
}

export default Searchbox;
