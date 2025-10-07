import React, { useEffect, useState } from "react";
import likeSVG from "../assets/favorite.svg";
import clockSVG from "../assets/time.svg";
import servingSVG from "../assets/user.svg";

function RecipeCard({ id, fullRecipe }) {
  const [recipeData, setRecipeData] = useState({});
  const [isFav, setIsFav] = useState(false);
  const [isFullOpen, setIsFullOpen] = useState(false);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        setRecipeData(null);
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/recipes/${id}/information?apiKey=${
            import.meta.env.VITE_API_KEY
          }`
        );
        const data = await response.json();
        setRecipeData(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipeData();
  }, [id]);

  const handleLikeBtn = () => {
    setIsFav(!isFav);
  };

  const handleOpen = () => {
    setIsFullOpen(true);
    fullRecipe(isFullOpen, id);
  };

  return (
    <div
      className="drop-shadow-lg drop-shadow-amber-200 m-2 p-1 h-80 relative max-w-80"
      onClick={() => handleOpen()}
    >
      {/* like btn */}
      <div
        className={`h-4 w-4 md:h-6 md:w-6 ${
          isFav ? "bg-red-300" : "bg-white"
        } rounded-[50%] absolute right-0 top-0 m-1 opacity-75`}
      >
        <button
          className="flex items-center justify-center h-4 w-4 md:h-6 md:w-6 cursor-pointer"
          onClick={() => handleLikeBtn()}
        >
          <img src={likeSVG} alt="Like" className="h-2 w-2 md:h-4 md:w-4" />
        </button>
      </div>

      {/* img */}
      <div className="w-full h-[65%] rounded-t-lg">
        {recipeData.image ? (
          <img
            src={recipeData.image}
            alt="recipe"
            className="h-full w-full object-fill rounded-t-lg"
          />
        ) : (
          <div className="h-full w-full rounded-t-lg text-lg text-gray-500">
            No image available
          </div>
        )}
      </div>

      {/* details */}
      <div className="bg-white w-full h-[35%] rounded-b-lg">
        <div className="text-sm font-semibold p-1">{recipeData.title}</div>
        <div className="grid grid-cols-2 p-1 gap-4">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4">
              <img src={clockSVG} alt="clock" className="h-4 w-4" />
            </div>
            <div className="text-sm text-gray-800">
              Tot: {recipeData.readyInMinutes ? recipeData.readyInMinutes : "0"}
              min
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4">
              <img src={servingSVG} alt="clock" className="h-4 w-4" />
            </div>
            <div className="text-sm text-gray-800">
              Serves: {recipeData.servings}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4">
              <img src={clockSVG} alt="clock" className="h-4 w-4" />
            </div>
            <div className="text-sm text-gray-800">
              Prep:
              {recipeData.preparationMinutes
                ? recipeData.preparationMinutes
                : "0"}
              min
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4">
              <img src={clockSVG} alt="clock" className="h-4 w-4" />
            </div>
            <div className="text-sm text-gray-800">
              Cook:{" "}
              {recipeData.cookingMinutes ? recipeData.cookingMinutes : "0"} min
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
