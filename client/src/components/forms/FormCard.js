import React, { Component } from 'react';
import "../../css/forms/FormCard.css";


class FormCard extends Component {
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
            <div className="form_card">
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
                            <input type="password" name="password" required></input>
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
                            <div className="provider" id="google_provider">
                                <i className="icofont-google-plus icon_round"></i>
                                <p>Google</p>
                            </div>

                            <div className="provider" id="fb_provider">
                                <i className="icofont-facebook icon_round"></i>
                                <p>Facebook</p>
                            </div>
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


export default FormCard;
