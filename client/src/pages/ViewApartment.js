import React, { Component } from 'react';
import Lottie from "lottie-react";

import "../css/pages/ViewApartment.css";

import fetchAPIData from "../controllers/fetchData";
import loadingAnimation from "../animations/loading.json";
import errorAnimation from "../animations/error-404-facebook-style.json";

import Navbar from '../components/navbars/Navbar';
import ApartmentPhotos from '../components/cards/ApartmentPhotos';
import SearchApartment from '../components/cards/SearchApartment';
import ApartmentCarousel from '../components/cards/ApartmentCarousel';


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
        const { status, data } = await fetchAPIData("http://localhost:9000/apartments/");

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
            if(loading) {
                return(
                    <div index={ 0 } className="info_message" title="Loading Apartment Data">
                        <Lottie animationData={ loadingAnimation } />
                    </div>
                );
            } else if(responseCode === "fail" || responseCode == null) {
                return(
                    <div index={ 0 } className="info_message" title="Error Loading Apartment Data">
                        <Lottie animationData={ errorAnimation } />
                    </div>
                );
            } else {
                return (
                    <ApartmentCarousel 
                        apartmentData={ apartmentData }
                    />
                );
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
                            <p className="title">{ apartmentData !== null ? apartmentData.length : 0 } Results</p>

                           {
                               buildApartmentCards()
                           }
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}
