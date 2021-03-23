import React, { Component } from 'react';
import "../../css/footers/Footer.css";
import FeaturedPost from './footer_components/FeaturedPost';

import LinkGroup from './footer_components/LinkGroup';


class Footer extends Component {
    render() {
        const footerLinksArr = [
            {
                "title": "News",
                "links": {
                    "Agency News": ".",
                    "Brand News": ".",
                    "Industry News": ".",
                    "Marketing Resources": "",
                    "Interviews": ""
                }
            },
            {
                "title": "Work",
                "links": {
                    "Ad Campaigns": ".",
                    "Branding": ".",
                    "Case Studies": ".",
                    "Website Design": ""
                }
            }
        ];

        function buildLinkGroups() {
            const linkGroups = footerLinksArr.map((footerLinkObj, index)=>{
                return(
                    <LinkGroup 
                        key={ index }
                        footerLinksTitle={ footerLinkObj.title }
                        footerLinks={ footerLinkObj.links }
                    />
                );
            });

            return linkGroups;
        }

        return (
            <div className="footer">
                { buildLinkGroups() }

                <div className="featured_posts">
                    <p className="title">Featured Posts</p>

                    <FeaturedPost 
                        post_img_url="images/apartments/alberto-castillo-q-mx4mSkK9zeo-unsplash.jpg"
                        post_tags={
                            ["New Houses", "Bahamas"]
                        }
                        post_title="New Homes In The Bahamas"
                        post_desc="As part of an ongoing project, Land For Sale is officially 
                        opening sale for homes in the Bahamas..."
                    />

                    <FeaturedPost 
                        post_img_url="images/apartments/scott-webb-1ddol8rgUH8-unsplash.jpg"
                        post_tags={
                            ["Mega Sale", "Low Prices"]
                        }
                        post_title="60% Of Our Houses Are Now On Sale!!"
                        post_desc="Our annual Mega Sale is here!! 60% of our houses are 
                        now on sale. Get yours before sale ends on Nov 26"
                    />

                </div>
            </div>
        )
    }
}


export default Footer;
