import "./App.css";
import React from "react";
import StoriesPage from "./pages/Stories-Page";
import Login from "./components/Login";
import Router from "./components/Router";

const App = () => {
  return (
    <div className="App">
      <Router />
    </div>
  );
};

export default App;
