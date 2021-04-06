import React, { Component } from 'react';
import "../../css/cards/ApartmentFacilities.css";

export default class ApartmentFacilities extends Component {
    render() {
        const { facilities } = this.props;

        function buildFacilitiesList() {
            const facilitiesList = [];

            for(const key in facilities) {
                let iconClass = "";

                if(key === "bathrooms") {
                    iconClass = "icofont-bathtub";
                } else if(key === "bedrooms") {
                    iconClass = "icofont-bed";
                } else if(key === "carpet area") {
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
            <div className="facilities">
                {
                    buildFacilitiesList()
                }
            </div>
        )
    }
}
