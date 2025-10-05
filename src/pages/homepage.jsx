import React, { useState } from "react";
import Searchbox from "../components/searchbox";
import RecipeContainer from "../components/recipeContainer";

function Homepage() {
  const [results, setResults] = useState([]);
  const [finalSearch, setFinalSearch] = useState("");
  const [ingredientFilter, setIngredientFilter] = useState([]);

  // call random api when both are empty
  const fetchRandomRecipes = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/recipes/random?apiKey=${
        import.meta.env.VITE_API_KEY
      }`
    );
    const data = await response.json();
    const recipes = data.recipes;
    console.log(recipes);
    return recipes;
  };

  // call result api for filtered recipe
  const fetchFilteredRecipes = async () => {
    
  }

  return (
    <>
      {/* searchbox */}
      <div className="pt-16">
        <Searchbox
          fetchSearchInput={(recipe) => setFinalSearch(recipe)}
          fetchIngredientFilter={(ingredients) =>
            setIngredientFilter(ingredients)
          }
        />
      </div>
    </>
  );
}

export default Homepage;
