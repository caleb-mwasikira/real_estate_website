import React, { Component } from "react";


class SearchCategory extends Component {
    render() {
        const { categoryName, categoryList } = this.props;

        return (
            <div className="search_category select">
                <label htmlFor="">{ categoryName }</label>
                <select id="standard-select">
                    
                    {
                        categoryList.map((categoryItem, index) => {
                            return(
                                <option key={ index } value={ categoryItem }>{ categoryItem }</option>
                            );
                        })
                    }
                </select>
            </div>
        )
    }
}

export default SearchCategory;