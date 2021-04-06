import React, { Component } from 'react';

import "../../css/navbars/Navbar.css";
import UserProfile from '../cards/UserProfile';


class Navbar extends Component {
    render() {
        const { navbar_items, is_logged_in } = this.props;

        function renderNavbarItems() {
            const navbarItems = [];
            
            for(var key in navbar_items) {
                navbarItems.push(
                    <li key={ key } className="navbar_item"><a href={ navbar_items[key] }>{ key }</a></li>
                );
            }

            return navbarItems;
        }

        return (
            <div className="navbar">
                <ul className="navbar_items">
                    {
                        renderNavbarItems()
                    }
                </ul>

                {
                    is_logged_in ?
                    <UserProfile 
                        username="Sallie Scott"
                        account_type="User"
                        img_url="images/users/foto-sushi-6anudmpILw4-unsplash.jpg"
                    /> :
                    <a href="." className="signup_btn">SignUp</a>
                }

            </div>
        );
    }
}


export default Navbar;
