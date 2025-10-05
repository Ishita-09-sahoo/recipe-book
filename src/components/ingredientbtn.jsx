import React, { useState, useEffect } from "react";
import filterIcon from "../assets/filter.svg";
import IngredientSelection from "./ingredientSelection";

function IngredientBtn({ ingredientFilter }) {
  const [btnActive, setBtnActive] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const btnClicked = () => {
    setBtnActive(!btnActive);
  };

  useEffect(() => {
    ingredientFilter(ingredients);
  }, [ingredients, ingredientFilter]);

  return (
    <div className="absolute right-6 top-2 flex flex-col justify-center items-end gap-2">
      {/* btn */}
      <div className="h-10 w-10 flex items-center justify-center cursor-pointer hover:border-white hover:border-2 hover:rounded">
        <button className="cursor-pointer" onClick={() => btnClicked()}>
          <img
            src={filterIcon}
            alt="ingredients"
            className="h-6 w-6 sm:h-8 sm:w-8"
          />
        </button>
      </div>

      {/* selection box */}
      <div>
        <IngredientSelection
          isOpen={btnActive}
          isDone={() => setBtnActive(false)}
          ingredients={(finalIngredients) => setIngredients(finalIngredients)}
        />
      </div>
    </div>
  );
}

export default IngredientBtn;
