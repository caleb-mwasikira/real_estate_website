import React from "react";
import './css/App.css';

// import LandingPage from "./pages/LandingPage";
// import SignUpPage from "./pages/SignUpPage";
// import ViewApartment from "./pages/ViewApartment";
import BookPropertyForm from "./components/cards/BookPropertyForm";


export default class App extends React.Component {
  render() {
    return(
      <div className="app">
        {/* <LandingPage /> */}

        {/* <SignUpPage /> */}

        {/* <ViewApartment /> */}

        <BookPropertyForm />
      </div>
    );
  }
}
