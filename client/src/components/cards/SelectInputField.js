import React, { Component } from 'react';
import "../../css/cards/SelectInputField.css";


export default class SelectInputField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_option: this.props.selected_option
        }

        this.selectOption = this.selectOption.bind(this);
    }

    selectOption(option) {
        this.setState({
            selected_option: option
        });
    }

    render() {
        const { options, option_name } = this.props;
        const selected_option = this.state.selected_option;


        return (
            <div className="select_input_field">
                <p className="select_input_name">{ option_name }</p>
                <ul className="select_options">
                    {
                        options.map((item, index) => {
                            let default_classname = "select_option";

                            if(item === selected_option) {
                                default_classname += " selected_option";
                            } 
                            
                            return(
                                <li 
                                    key={ index } className={ default_classname }
                                    onClick={ () => this.selectOption(item) }
                                >
                                { item }
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        )
    }
}
