import React, { Component } from 'react';
import "../../css/search/SearchBar.css";

export default class SearchBar extends Component {
    render() {
        return (
            <form>
                <div className="searchbar">
                    <input type="text" placeholder="Search Apartments"></input>
                    <button className="btn_filled search_btn">
                        <i className="icofont-search"></i>
                    </button>
                </div>
            </form>
        )
    }
}
