import React, { Component } from 'react';
import "../../css/search/SearchCategory.css";


export default class SearchCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayOptions: false
        }

        this.toggleOptions = this.toggleOptions.bind(this)
    }

    toggleOptions() {
        this.setState((prevState) => ({
            displayOptions: !prevState.displayOptions
        }));
    }

    render() {
        const { displayOptions } = this.state;
        const { category_icon_1, category_name, category_icon_2, search_options } = this.props;

        function displayOptionsClasses() {
            if(displayOptions) {
                return {
                    display: "block"
                }
            } else {
                return {
                    display: "none"
                }
            }
        }

        return (
            <div className="search_category">
                <div className="search_pill" onClick={ this.toggleOptions }>
                    <i className={ category_icon_1 }></i>
                    <p>{ category_name }</p>
                    <i className={ category_icon_2 }></i>
                </div>

                <div className="search_options" style={ displayOptionsClasses() }>
                    {
                        search_options.map((category, index) => {
                            return(
                                <p key={ index } className="search_option">{category}</p>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}
