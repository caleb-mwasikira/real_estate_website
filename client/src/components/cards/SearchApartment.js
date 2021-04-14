import React, { Component } from 'react';
import "../../css/cards/SearchApartment.css";

import SelectInputField from './SelectInputField';
import CustomCheckBox from './CustomCheckBox';


export default class SearchApartment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected_property_type: null,
            property_types: {
                "Apartment": "images/icons/apartment.png",
                "Commercial": "images/icons/commercial.png",
                "House": "images/icons/house.png",
                "Land": "images/icons/land.png"
            }
        }
        this.selectPropertyType = this.selectPropertyType.bind(this)
    }

    selectPropertyType(key) {
        this.setState({
            selected_property_type: key
        });
        console.log(this.state.selected_property_type);
    }

    buildPropertyTypeItems() {
        const { property_types, selected_property_type } = this.state;
        const property_type_items = [];

        for(const [key, value] of Object.entries(property_types)) {
            const propertyTypeClasses = () => {
                return key === selected_property_type ? "property_type selected_property": "property_type";
            }

            property_type_items.push(
                <div 
                    key={ key }
                    className={ propertyTypeClasses() } id={ key }
                    onClick={ () => this.selectPropertyType(key) }
                >
                    <img src={ value } alt="property_type_icon"></img>
                    <p className="property_type_name">{ key }</p>
                </div>
            );
        }

        return property_type_items;
    }

    render() {
        return (
            <form className="search_apartment">
                <div className="form_field">
                    <h3>Search For Your Dream Home</h3>
                </div>
                <div className="form_field">
                    <p className="title">Property Type</p>
                    <div className="property_types">
                        {
                            this.buildPropertyTypeItems()
                        }
                    </div>
                </div>

                <div className="form_field">
                    <p className="title">Property Rooms</p>
                    <SelectInputField 
                        options={ ["1", "2", "3", "4", "5+"] }
                        option_name="Bedrooms"
                        selected_option="2"
                    />
                    <SelectInputField 
                        options={ ["1", "2", "3", "4", "5+"] }
                        option_name="Bathrooms"
                        selected_option="4"
                    />

                </div>

                <div className="form_field">
                    <p className="title">Amenities</p>
                    <CustomCheckBox 
                        name="Furnished"
                    />
                    <CustomCheckBox 
                        name="Pet Allowed"
                    />
                    <CustomCheckBox 
                        name="Shared Accomodation"
                    />
                </div>

                <div className="form_btns">
                    <button type="reset" className="btn btn_outlined">Reset</button>
                    <button type="submit" className="btn btn_filled">Apply</button>
                </div>

            </form>
        )
    }
}
