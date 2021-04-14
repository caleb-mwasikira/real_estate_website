import React, { Component } from 'react';
import "../../css/cards/ApartmentCard.css";

import ApartmentFacilities from './ApartmentFacilities';
import HeartIcon from './HeartIcon';
import SalesTag from './SalesTag';


export default class ApartmentCard extends Component {
    currencyFormatter(currency_code, amount) {
        // Create our number formatter.
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency_code,
        });

        return formatter.format(amount);
    }

    render() {
        const { apartment_img_url, sale_status, apartment_price, apartment_desc, apartment_address, facilities } = this.props;

        function salesTagBackgroundColor() {
            let background_color = "";

            if(sale_status === "For Sale") {
                background_color = "var(--color_success)";

            } else if(sale_status === "Sale Pending") {
                background_color = "var(--color_warning)";

            } else if(sale_status === "Sold") {
                background_color = "var(--color_danger)";
            }

            return background_color;
        }

        return (
            <div className="apartment_card">
                <div className="apartment_image">
                    <img src={ apartment_img_url } alt="apartment_image"></img>

                    <HeartIcon />

                    <SalesTag 
                        color="var(--color_white)"
                        background_color={ salesTagBackgroundColor() }
                        text={ sale_status }
                    />

                </div>

                <div className="apartment_details">
                    <div className="apartment_price">
                        <p>{ this.currencyFormatter(apartment_price.currency_code, apartment_price.amount) }</p>
                    </div>
                    <div className="apartment_desc">
                        <p>{ apartment_desc }</p>
                    </div>

                    <div className="location_details">
                        <i className="icofont-location-pin"></i>
                        <p className="apartment_address">{ apartment_address }</p>
                    </div>

                    <ApartmentFacilities 
                        facilities={ facilities }
                    />
                </div>
            </div>
        )
    }
}
