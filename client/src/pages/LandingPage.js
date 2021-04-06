import React, { Component } from "react";
import "../css/pages/LandingPage.css";

import fetchApartmentData from "../controllers/fetchData";

import SelectBar from "../components/headers/SelectBar";
import ApartmentCard from "../components/cards/ApartmentCard";
import Footer from "../components/footers/Footer";
import Navbar from "../components/navbars/Navbar";


export default class LandingPage extends Component {
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
        const navbarItems = {
            "Home": ".",
            "About": ".",
            "Features": ".",
            "Contact": ".",
            "Login": ".",
        }

        function buildApartmentCards() {
            if(loading || !apartmentData) {
                return(
                    <div>
                        <p className="sub_title">Loading Apartment Data...</p>
                    </div>
                );
            }

            if(apartmentData.status === "success") {
                const apartmentCards = apartmentData.data.map((apartment) => {
                    return(
                        <ApartmentCard 
                            key={ apartment._id }
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
                
            }else {
                return(
                    <div>
                        <p className="sub_title">Error Loading Data...</p>
                    </div>
                );
            } 
        }

        return (
            <div className="landing_page">
                <header className="header">
                    <Navbar 
                        navbar_items={ navbarItems }
                        is_logged_in={ false }
                    />

                    <div className="display">
                        <img src="images/apartments/scott-webb-1ddol8rgUH8-unsplash.jpg" alt="display_image"></img>
                        <div className="box_decorator">
                            <p>Home Is Where The House Is</p>
                        </div>

                        <SelectBar />
                    </div>
                </header>

                <div className="featured_apartments">
                    <p className="title">Featured Apartments</p>

                    <div className="apartment_row">
                        { buildApartmentCards() }
                    </div>
                </div>

                <Footer />
            </div>
        )
    }
}
