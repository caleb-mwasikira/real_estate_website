import React, { Component } from 'react';

import "../../css/cards/ApartmentPhotos.css";
import HeartIcon from './HeartIcon';


export default class ApartmentPhotos extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPhoto: this.props.photos[0],
            photos: this.props.photos
        }
        this.selectPhoto = this.selectPhoto.bind(this);
    }

    selectPhoto(photo) {
        this.setState({
            selectedPhoto: photo
        })
    }

    render() {
        const { photos, selectedPhoto } = this.state;

        return (
            <div className="apartment_photos">
                <div className="selected_photo">
                    <HeartIcon />
                    <div className="photo_desc">
                        <p>MS Northbound, Peachfield Road UK</p>
                        <p>$ 15000/Year</p>
                    </div>
                    <img src={ selectedPhoto } alt="apartment_image"></img>
                </div>

                <div className="more_photos">
                    {
                        photos.map((photo, index) => {
                            return(
                                <div 
                                    key={ index } id={ index } className="apartment_photo"
                                    onClick={ () => this.selectPhoto(photo) } 
                                >
                                    <img src={ photo } alt="apartment_image"/>
                                </div>
                            );
                        })
                    }
                </div>

            </div>
        );
    }
}
