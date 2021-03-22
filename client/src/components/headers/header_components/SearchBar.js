import React, { Component } from 'react';
import "../../../css/headers/SearchBar.css";

import SearchCategory from './SearchCategory';


class SearchBar extends Component {    
    render() {
        const cities = ["Cape Verde", "Mombasa-Kenya", "Chicago"];
        const propertyTypes = ["Bungalow", "Mansion", "Flat"];

        return (
            <div className="search_bar">
                <ul className="search_actions">
                    <li className="search_action">Buy</li>
                    <li className="search_action">Sell</li>
                    <li className="search_action">Rent</li>
                </ul>
                <form method="GET" action=".">
                    <SearchCategory 
                        categoryName="City/Street"
                        categoryList={ cities }
                    />

                    <SearchCategory
                        categoryName="Property Type"
                        categoryList={ propertyTypes }
                    />

                    <button type="submit" className="btn_filled">Search</button>
                </form>
            </div>
        )
    }
}

export default SearchBar;