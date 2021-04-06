import React, { Component } from 'react';
import "../../css/cards/UserProfile.css";


export default class UserProfile extends Component {
    render() {
        const { username, account_type, img_url } = this.props;

        return (
            <div className="user_profile">
                <div className="user_details">
                    <p className="username">{ username }</p>
                    <p className="account_type">{ account_type }</p>
                </div>
                <img src={ img_url } alt="user_img" title={ username }></img>
            </div>
        )
    }
}
