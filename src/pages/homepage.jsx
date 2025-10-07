import React, { useEffect, useState } from "react";
import Searchbox from "../components/searchbox";
import RecipeContainer from "../components/recipeContainer";
import FullRecipe from "../components/fullRecipe";

function Homepage() {
  const [results, setResults] = useState([]);
  const [finalSearch, setFinalSearch] = useState("");
  const [ingredientFilter, setIngredientFilter] = useState([]);
  const [fullRecipe, setFullRecipe] = useState(false);
  const [fullRecipeId, setFullRecipeId] = useState(null);

  // call random api when both are empty
  const fetchRandomRecipes = async () => {
    try {
      const url = `${import.meta.env.VITE_BASE_URL}/recipes/random?apiKey=${
        import.meta.env.VITE_API_KEY
      }&number=6`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      console.log(data.recipes);
      setResults(data.recipes);
    } catch (error) {
      console.error(error);
    }
  };

  // call result api for filtered recipe
  const fetchFilteredRecipes = async () => {
    try {
      var url = `${
        import.meta.env.VITE_BASE_URL
      }/recipes/complexSearch?apiKey=${import.meta.env.VITE_API_KEY}`;
      if (finalSearch !== "") {
        url += `&query=${finalSearch}`;
      }
      if (ingredientFilter.length !== 0) {
        url += `&includeIngredients=${ingredientFilter.join(",")}`;
      }

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const recipes = data.results;
      console.log(recipes);
      return recipes;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (finalSearch !== "" || ingredientFilter.length !== 0) {
      const fetchResults = async () => {
        const recipes = await fetchFilteredRecipes();
        console.log(recipes);
        setResults(recipes);
      };
      fetchResults();
    }
  }, [finalSearch, ingredientFilter]);

  useEffect(() => {
    if (finalSearch === "" && ingredientFilter.length === 0) {
      fetchRandomRecipes();
      console.log(results);
    }
  }, []);

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

      {/* recipe container */}
      {!fullRecipe && (
        <div className="w-full pt-14 z-0">
          <RecipeContainer
            recipes={results}
            fullRecipe={(isFullOpen, id) => {
              setFullRecipe(isFullOpen);
              setFullRecipeId(id);
            }}
          />
        </div>
      )}

      {/* full recipe */}
      {fullRecipe && (
        <div className="w-full pt-14 z-0 flex items-center justify-center">
          <FullRecipe id={fullRecipeId} />
        </div>
      )}
    </>
  );
}

export default Homepage;
