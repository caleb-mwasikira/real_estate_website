import React from "react";
import './App.css';

import LandingPage from "./pages/LandingPage";
// import SignUpPage from "./pages/SignUpPage";


class App extends React.Component {
  render() {
    return(
      <div className="app">
        <LandingPage />

        {/* <SignUpPage /> */}
      </div>
    );
  }
}

export default App;
