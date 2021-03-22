import React, { Component } from "react";
import "../css/pages/LandingPage.css";

import fetchApartmentData from "../controllers/fetchData";

import Header from "../components/headers/Header";
import ApartmentCard from "../components/cards/ApartmentCard";


class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            apartmentData: null
        }
    }

    async componentDidMount() {
        const apartmentData = await fetchApartmentData();

        this.setState({
            loading: false,
            apartmentData: apartmentData
        })
    }
    
    render() {
        const { loading, apartmentData } = this.state;

        function buildApartmentCards() {
            if(loading || !apartmentData) {
                return(
                    <div>
                        Loading Apartment Data...
                    </div>
                );
            }

            const apartmentCards = apartmentData.map((apartment) => {
                return(
                    <ApartmentCard 
                        key={ apartment.id.$oid }
                        apartment_img_url={ apartment.img_url }
                        sale_status={ apartment.sale_status }
                        apartment_price={ apartment.price }
                        apartment_desc={ apartment.desc }
                        apartment_address={ apartment.address }
                        facilities={ apartment.facilities }
                    />
                );
            });

            return apartmentCards;
        }

        return (
            <div className="landing_page">
                <Header />

                <div className="featured_apartments">
                    <p className="title">Featured Apartments</p>

                    <div className="apartment_row">
                        { buildApartmentCards() }
                    </div>
                </div>
            </div>
        )
    }
}


export default LandingPage;
