import React, { Component } from "react";
import "../../css/headers/SelectCategory.css";

export default class SelectCategory extends Component {
    render() {
        const { categoryName, categoryList } = this.props;

        return (
            <div className="select_category select">
                <label htmlFor="">{ categoryName }</label>
                <select>
                    
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