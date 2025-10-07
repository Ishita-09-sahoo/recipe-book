import React, { useEffect, useState } from "react";
import RecipeCard from "./recipeCard";

function RecipeContainer({ recipes, fullRecipe }) {
  const [isFullOpen, setIsFullOpen] = useState(false);
  const [recipeId, setRecipeId] = useState(null);

  useEffect(() => {
    fullRecipe(isFullOpen, recipeId);
  },[isFullOpen])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 mx-auto items-center justify-center">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="flex justify-center items-center">
          <RecipeCard
            id={recipe.id}
            fullRecipe={(isFullOpen, id) => {
              setIsFullOpen(isFullOpen);
              setRecipeId(id);
            }}
          />
        </div>
      ))}
      {/* <div className="flex justify-center items-center"><RecipeCard id={716429} /></div>
      <div className="flex justify-center items-center"><RecipeCard id={716429} /></div>
      <div className="flex justify-center items-center"><RecipeCard id={716429} /></div>
      <div className="flex justify-center items-center"><RecipeCard id={716429} /></div>
      <div className="flex justify-center items-center"><RecipeCard id={716429} /></div>
      <div className="flex justify-center items-center"><RecipeCard id={716429} /></div> */}
    </div>
  );
}

export default RecipeContainer;
