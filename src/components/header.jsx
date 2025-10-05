import React from "react";
import favoritesSVG from "../assets/Favourites.svg";
import homeSVG from "../assets/Home.svg";
import { Routes, Route, Link } from "react-router-dom";

function Header() {
  return (
    <>
      <div className="fixed top-0 h-16 w-full shadow-md">
        <div className="h-full w-full bg-amber-400 flex items-center justify-center">
          <div className="flex items-center justify-between w-[80%]">
            <div className="text-xl lg:text-2xl font-medium text-[#181A20]">
              Recipe Finder
            </div>
            <div className="h-4 flex gap-4">
              <Link to="/favorites">
                {" "}
                <img src={favoritesSVG} alt="Favorites" className="h-4 w-4 md:h-6 md:w-6" />
              </Link>
              <Link to="/">
                {" "}
                <img src={homeSVG} alt="Home" className="h-4 w-4 md:h-6 md:w-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
