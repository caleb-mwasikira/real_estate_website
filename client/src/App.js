import React from "react";
import './App.css';

import LandingPage from "./pages/LandingPage";
// import SignUpPage from "./pages/SignUpPage";
// import ViewApartment from "./pages/ViewApartment";

export default class App extends React.Component {
  render() {
    return(
      <div className="app">
        <LandingPage />

        {/* <SignUpPage /> */}

        {/* <ViewApartment /> */}
      </div>
    );
  }
}
