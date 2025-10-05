// import { useState } from 'react'
import Header from "./components/header";
import { Routes, Route, Link } from "react-router-dom";
import Homepage from "./pages/homepage";
import Favorites from "./pages/favorites";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
