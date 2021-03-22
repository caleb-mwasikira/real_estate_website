import React from "react";
import './App.css';

import LandingPage from "./pages/LandingPage";


class App extends React.Component {
  render() {
    return(
      <div className="app">
        <LandingPage />
      </div>
    );
  }
}

export default App;
