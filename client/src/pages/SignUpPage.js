import React, { Component } from 'react';
import "../css/pages/SignUpPage.css";


export default class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userIsSigningUp: true
        }

        this.changeSignUpStatus = this.changeSignUpStatus.bind(this)
    }

    changeSignUpStatus() {
        this.setState((prevState) => ({
            userIsSigningUp: !prevState.userIsSigningUp
        }));
    }

    render() {
        const { userIsSigningUp } = this.state;

        function getFormOptionClasses(userIsSigningUp) {
            let defaultClasses = "form_option ";

            return userIsSigningUp ? defaultClasses + "selected_option" : defaultClasses;
        }

        return (
            <div className="signup_page">
                <div className="form_portrait">
                    <img src="images/timon-klauser-3MAmj1ZKSZA-unsplash.jpg" alt="form_image"></img>
                </div>

                <div className="form">
                    <ul className="form_options">
                        <li className={ getFormOptionClasses(userIsSigningUp) } onClick={ this.changeSignUpStatus }>
                            SignUp
                        </li>
                        <li className={ getFormOptionClasses(!userIsSigningUp) } onClick={ this.changeSignUpStatus }>
                            SignIn
                        </li>
                    </ul>
                    <p className="helper_text">Welcome To <a href=".">Company Name</a></p>
                    <h2 className="form_title">
                        {
                            userIsSigningUp
                            ? "New Account"
                            : "Logging In"
                        }
                    </h2>

                    <form method="POST" action={ userIsSigningUp ? "./signup" : "./login" }>
                        <div className="form_field">
                            <label htmlFor="username">Email Address</label>
                            <input type="email" name="username" placeholder="Johndoe@gmail.com" required></input>
                        </div>

                        <div className="form_field">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" placeholder="********" required></input>
                        </div>

                        <div className="checkbox_field">
                            <input type="checkbox" name="checkbox" required></input>
                            <span className="helper_text">I Agree To The <a href=".">Terms</a> And <a href=".">Conditions</a></span>
                        </div>

                        <button type="submit" className="btn_filled">
                            {
                                userIsSigningUp
                                ? "Create Account"
                                : "Log In"
                            }
                        </button>
                    </form>

                    <div className="providers_auth">
                        <p className="helper_text">Or { userIsSigningUp ? "SignUp" : "Login"} With</p>

                        <div className="providers">
                            <a href=".">
                                <img src="images/icons/google-logo.png" alt="google_signup"></img>
                            </a>

                            <a href=".">
                                <img src="images/icons/facebook-logo.png" alt="fb_signup"></img>
                            </a>

                        </div>

                        {
                            userIsSigningUp
                            ? <p className="helper_text">Already Have An Account? <a href=".">Login</a></p>
                            : <p className="helper_text">Dont Have An Account? <a href=".">Create Account</a></p>
                        }
                    </div>
                </div>
            </div>
        )
    }
}