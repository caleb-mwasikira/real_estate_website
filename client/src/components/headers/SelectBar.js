import React, { Component } from 'react';
import "../../css/headers/SelectBar.css";

import SelectCategory from './SelectCategory';


export default class SelectBar extends Component {    
    render() {
        const cities = ["Cape Verde", "Mombasa-Kenya", "Chicago"];
        const propertyTypes = ["Bungalow", "Mansion", "Flat"];

        return (
            <div className="select_bar">
                <ul className="select_options">
                    <li className="option selected_option">Buy</li>
                    <li className="option">Sell</li>
                    <li className="option">Rent</li>
                </ul>

                <form method="GET" action=".">
                    <SelectCategory 
                        categoryName="City/Street"
                        categoryList={ cities }
                    />

                    <SelectCategory
                        categoryName="Property Type"
                        categoryList={ propertyTypes }
                    />

                    <button type="submit" className="btn_filled">Search</button>
                </form>
            </div>
        )
    }
}