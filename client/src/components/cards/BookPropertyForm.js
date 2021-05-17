import React, { Component } from 'react';
import "../../css/cards/BookPropertyForm.css";

import CustomCheckBox from './CustomCheckBox';


export default class BookPropertyForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDefaultTabSelected: true
        };

        this.toggleDefaultTab = this.toggleDefaultTab.bind(this);
    }

    toggleDefaultTab() {
        this.setState((prevState) => ({
            isDefaultTabSelected: !prevState.isDefaultTabSelected
        }));
    }

    render() {
        const isDefaultTabSelected = this.state.isDefaultTabSelected;

        function formBtnClasses(isDefaultTabSelected) {
            return isDefaultTabSelected ? "btn_filled" : "form_btn";
        } 

        return (
            <form className="book_property_form">
                <div className="form_btns">
                    <button className={ formBtnClasses(isDefaultTabSelected) } onClick={ this.toggleDefaultTab }>Schedule a tour</button>
                    <button className={ formBtnClasses(!isDefaultTabSelected) } onClick={ this.toggleDefaultTab }>Request Info</button>
                </div>

                <div className="form_field">
                    <p className="para">Tour Type &#9432;</p>
                    <div className="checkboxes">
                        <CustomCheckBox 
                            name="In-Person"
                        />
                        <CustomCheckBox 
                            name="Virtual-Tour"
                        />
                    </div>
                </div>

                <div className="form_field">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Enter Your Name" required></input>
                </div>

                <div className="form_field">
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" placeholder="254-xxx-xxx-xxx" pattern="[0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{3}" required></input>
                </div>

                <div className="form_field">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Enter Email" required></input>
                </div>

                <button type="submit" className="form_field btn_filled submit_btn">Schedule A Tour</button>
            </form>
        )
    }
}
