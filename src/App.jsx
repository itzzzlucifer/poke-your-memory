import React from "react";
import PokeList from "./components/PokeList";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
  return (
    <>
      <div className="background-mask">
        <div className="main">
          <NavBar />
          <PokeList />
        </div>
      </div>
    </>
  );
}

export default App;
