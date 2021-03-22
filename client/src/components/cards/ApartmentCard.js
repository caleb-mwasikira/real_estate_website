import React, { Component } from 'react';
import "../../css/cards/ApartmentCard.css";


class ApartmentCard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             isStarred: false
        }

        this.handleStar = this.handleStar.bind(this)
    }

    handleStar() {
        this.setState((prevState) => ({
            isStarred: !prevState.isStarred
        }));
    }

    currencyFormatter(currency_code, amount) {
        // Create our number formatter.
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency_code,
        });

        return formatter.format(amount);
    }

    render() {
        const { isStarred } = this.state;
        const { apartment_img_url, sale_status, apartment_price, apartment_desc, apartment_address, facilities } = this.props;

        function saleTagStyles() {
            let style = {}

            if(sale_status === "For Sale") {
                style = {
                    backgroundColor: "var(--color_success)",
                }
            } else if(sale_status === "Sale Pending") {
                style = {
                    backgroundColor: "var(--color_warning_dark)",
                }
            } else if(sale_status === "Sold") {
                style = {
                    backgroundColor: "var(--color_danger)",
                }
            }

            return style;
        }

        function buildFacilitiesList() {
            const facilitiesList = [];

            for(const key in facilities) {
                let iconClass;

                if(key === "bathrooms") {
                    iconClass = "icofont-bathtub";
                } else if(key === "bedrooms") {
                    iconClass = "icofont-bed";
                } else {
                    iconClass = "icofont-foot-print";
                }

                facilitiesList.push(
                    <div className="facility" title={ key } key={ key }>
                        <i className={ iconClass }></i>
                        <p>{ facilities[key] }</p>
                    </div>
                )
            }
            
            return facilitiesList;
        }

        return (
            <div className="apartment_card">
                <div className="apartment_image">
                    <img src={ apartment_img_url } alt="apartment_image"></img>

                    {
                        isStarred
                        ? <i className="icofont-star is_starred" onClick={ this.handleStar }></i>
                        : <i className="icofont-star" onClick={ this.handleStar }></i>
                    }

                    <p className="sale_status_tag" style={ saleTagStyles() }>{ sale_status }</p>

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

                    <div className="facilities">
                        { buildFacilitiesList() }
                    </div>
                </div>
            </div>
        )
    }
}

export default ApartmentCard;