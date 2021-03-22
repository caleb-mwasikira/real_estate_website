import React, { Component } from "react";
import "../css/pages/LandingPage.css";

import Header from "../components/headers/Header";


class LandingPage extends Component {
    render() {
        return (
            <div className="landing_page">
                <Header />
            </div>
        )
    }
}


export default LandingPage;
