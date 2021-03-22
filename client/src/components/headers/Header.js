import React, { Component } from 'react';
import "../../css/headers/Header.css";

import SearchBar from './header_components/SearchBar';


class Header extends Component {
    render() {
        return (
            <header className="header">
                <ul className="navbar">
                    <li className="navbar_item"><a href=".">Home</a></li>
                    <li className="navbar_item"><a href=".">About</a></li>
                    <li className="navbar_item"><a href=".">Features</a></li>
                    <li className="navbar_item"><a href=".">Contact</a></li>
                    <li className="navbar_item"><a href=".">Login</a></li>
                    <li className="navbar_item"><a href="." className="btn_filled">SignUp</a></li>
                </ul>

                <div className="display">
                    <img src="images/apartments/scott-webb-1ddol8rgUH8-unsplash.jpg" alt="display_image"></img>
                    <div className="box_decorator">
                        <p>Home Is Where The House Is</p>
                    </div>

                    <SearchBar />
                </div>
            </header>
        )
    }
}

export default Header;