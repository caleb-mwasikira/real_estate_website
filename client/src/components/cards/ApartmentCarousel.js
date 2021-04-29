import React, { Component } from 'react';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';

import 'pure-react-carousel/dist/react-carousel.es.css';
import '../../css/cards/ApartmentCarousel.css';

import ApartmentCard from './ApartmentCard';


export default class ApartmentCarousel extends Component {
    render() {
        const { apartmentData } = this.props;

        return (
            <CarouselProvider
                        id="carousel_provider"
                        naturalSlideWidth={ 100 }
                        naturalSlideHeight={ 125 }
                        totalSlides={ apartmentData !== null ? apartmentData.length : 0 }
                        visibleSlides={1}
                        currentSlide={1}
                    >
                        <Slider>
                            {
                                apartmentData.map((apartment, index) => {
                                    return(
                                        <Slide index={ index } key={ apartment._id }>
                                            <ApartmentCard 
                                                apartment_img_url={ apartment.img_url }
                                                sale_status={ apartment.sale_status }
                                                apartment_price={ apartment.price }
                                                apartment_desc={ apartment.desc }
                                                apartment_address={ apartment.address }
                                                facilities={ null }
                                            />
                                        </Slide>
                                    );
                                })
                            }
                        </Slider>

                        <ButtonBack className="btn_filled" id="prev_btn">Back</ButtonBack>
                        <ButtonNext className="btn_filled" id="next_btn">Next</ButtonNext>
                    </CarouselProvider>
        )
    }
}
