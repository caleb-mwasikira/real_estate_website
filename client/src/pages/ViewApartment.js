import React, { Component } from 'react';
import { Carousel } from "react-responsive-carousel";

import "../css/pages/ViewApartment.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import fetchApartmentData from "../controllers/fetchData";

import Navbar from '../components/navbars/Navbar';
import ApartmentCard from '../components/cards/ApartmentCard';
import ApartmentPhotos from '../components/cards/ApartmentPhotos';
import SearchApartment from '../components/cards/SearchApartment';


export default class ViewApartment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            responseCode: null,
            apartmentData: null,
        }
    }

    async componentDidMount() {
        const { status, data } = await fetchApartmentData();

        this.setState({
            loading: false,
            responseCode: status,
            apartmentData: data,
        });

    }

    render() {
        const navbarItems = {
            "Buy": ".",
            "Sell": ".",
            "Rent": "."
        }
        const { loading, responseCode, apartmentData } = this.state;


        function buildApartmentCards() {
            if(loading || responseCode === null) {
                return(
                    <div>
                        <p className="sub_title">Loading Apartment Data...</p>
                    </div>
                );
            } else if(responseCode === "fail") {
                return(
                    <div>
                        <p className="sub_title">Error Loading Data...</p>
                    </div>
                );
            } else {
                const apartmentCards = apartmentData.map((apartment) => {
                    return(
                        <div>
                            <ApartmentCard 
                                key={ apartment._id }
                                apartment_img_url={ apartment.img_url }
                                sale_status={ apartment.sale_status }
                                apartment_price={ apartment.price }
                                apartment_desc={ apartment.desc }
                                apartment_address={ apartment.address }
                                facilities={ apartment.facilities }
                            />
                        </div>
                    );
                });

                return apartmentCards;
            }
        }

        return (
            <div className="view_apartments">
                <Navbar 
                    navbar_items={ navbarItems }
                    is_logged_in={ true }
                />

                <div className="main_content">
                    <SearchApartment />

                    <div className="main_content_right">
                        <div className="main_apartment_card">

                            <ApartmentPhotos 
                                photos={[
                                        "images/apartments/douglas-sheppard-9rYfG8sWRVo-unsplash.jpg", 
                                        "images/apartments/bernard-hermant-KqOLr8OiQLU-unsplash.jpg",
                                        "images/apartments/jason-briscoe-UV81E0oXXWQ-unsplash.jpg",
                                        "images/apartments/pixasquare-4ojhpgKpS68-unsplash.jpg"
                                    ]}
                            />

                            <div className="apartment_details">
                                <p className="title">$15000/Year</p>
                                <p className="paragraph">MS Northbound, Peachfield Road UK</p>

                                <div className="description">
                                    <p className="title">Description</p>
                                    <p className="paragraph">
                                        It is a long established fact that a reader will be distracted
                                        by the content of a page when looking at its layout
                                    </p>
                                </div>

                                <div className="closer_locations">
                                    <p className="title">Closer Locations</p>
                                    <div className="closer_location">
                                        <div>
                                            <i className="icofont-train-line"></i>
                                            <span className="paragraph">Washington Union Station</span>
                                        </div>
                                        <span className="paragraph">0.5 miles</span>
                                    </div>

                                    <div className="closer_location">
                                        <div>
                                            <i className="icofont-bus"></i>
                                            <span className="paragraph">William B Travis Academy of Design</span>
                                        </div>
                                        <span className="paragraph">1 mile</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="more_search_results">
                            <p className="title">1034 Results</p>

                            <Carousel 
                                className="apartment_row"
                                centerMode={ true }
                                centerSlidePercentage="70"
                                showIndicators={ false }
                                showThumbs={ false }
                                swipeable={ true }
                            >
                                {
                                    buildApartmentCards()
                                }
                            </Carousel>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}
