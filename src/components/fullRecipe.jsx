import React, { useState, useEffect } from "react";
import likeSVG from "../assets/favorite.svg";
import clockSVG from "../assets/time.svg";
import servingSVG from "../assets/user.svg";

function FullRecipe({ id }) {
  const [recipeData, setRecipeData] = useState({});
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    // fetch recipe data
    const fetchRecipeData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_URL}/recipes/${id}/information?apiKey=${
            import.meta.env.VITE_API_KEY
          }`
        );
        const data = await response.json();
        console.log(data);
        setRecipeData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipeData();
    console.log(recipeData);
  }, []);

  const handleLikeBtn = () => {
    setIsFav(!isFav);
  };

  return (
    <div className="w-[80%] md:w-[60%] bg-amber-100 my-6 p-4 relative shadow-xl shadow-gray-500">
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
      <div className="w-full rounded-t-lg p-6 md:p-10">
        <img
          src={recipeData.image}
          alt="recipe"
          className="w-full aspect-auto h-auto object-cover drop-shadow-gray-700 drop-shadow-xl"
        />
      </div>

      {/* Details */}
      <div className="w-full bg-white h-auto rounded-lg drop-shadow-md">
        {/* title */}
        <div className="text-md md:text-lg font-semibold px-2 pt-4">
          {recipeData.title}
        </div>

        {/* time & serve */}
        <div className="grid grid-cols-2 p-2 gap-4 my-4 border-y border-gray-400">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 md:h-6 md:w-6">
              <img
                src={clockSVG}
                alt="clock"
                className="h-4 w-4 md:h-6 md:w-6"
              />
            </div>
            <div className="text-md md:text-lg text-gray-800">
              Tot: {recipeData.readyInMinutes} min
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 md:h-6 md:w-6">
              <img
                src={servingSVG}
                alt="clock"
                className="h-4 w-4 md:h-6 md:w-6"
              />
            </div>
            <div className="text-md md:text-lg text-gray-800">
              Serves: {recipeData.servings}{" "}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 md:h-6 md:w-6">
              <img
                src={clockSVG}
                alt="clock"
                className="h-4 w-4 md:h-6 md:w-6"
              />
            </div>
            <div className="text-md md:text-lg text-gray-800">
              Prep: {recipeData.preparationMinutes} min
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 md:h-6 md:w-6">
              <img
                src={clockSVG}
                alt="clock"
                className="h-4 w-4 md:h-6 md:w-6"
              />
            </div>
            <div className="text-md md:text-lg text-gray-800">
              Cook: {recipeData.cookingMinutes} min
            </div>
          </div>
        </div>

        {/* ingredients */}
        <div className="flex flex-col px-2">
          <div className="text-md md:text-lg font-semibold pb-2">
            Ingredients:
          </div>
          <ul className="text-md md:text-lg pb-2 flex flex-col gap-1">
            {(recipeData.extendedIngredients ?? []).map((ingredient,idx) => (
              <li key={ingredient.id}>
                {idx+1}. {ingredient.original}</li>
            ))}
          </ul>
        </div>

        {/* instructions */}
        <div className="flex flex-col px-2">
          <div className="text-md md:text-lg font-semibold py-2">
            Instructions:
          </div>
          <div className="text-md md:text-lg pb-2 flex flex-col gap-2">
            {(recipeData.analyzedInstructions ?? []).map((instruction, idx) => (
              <div key={idx}>
                {instruction.name !== "" && (
                  <div className="font-semibold">{instruction.name}</div>
                )}
                <div>
                  {(instruction.steps ?? []).map((step) => (
                    <div key={step.number} className="flex gap-2 items-center">
                      <div>
                        {step.number}. {step.step}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullRecipe;
