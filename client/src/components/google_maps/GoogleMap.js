import React, { Component } from 'react';
import "../../css/google_maps/GoogleMap.css";


class GoogleMap extends Component {
    render() {
        return (
            <div className="mapouter">
                <div className="gmap_canvas">
                    <iframe 
                        width="600" height="500" id="gmap_canvas" 
                        src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                        frameBorder="0" scrolling="no" marginHeight="0" 
                        marginWidth="0" title="google_map">
                    </iframe>
                    <a href="https://www.embedgooglemap.net">google html code</a>
                </div>
            </div>
        )
    }
}


export default GoogleMap;
