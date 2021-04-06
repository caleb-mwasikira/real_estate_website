import React, { Component } from 'react';
import "../../css/cards/HeartIcon.css";


export default class HeartIcon extends Component {
    constructor(props) {
        super(props);

        this.state = {
             isStarred: this.props.isStarred
        }

        this.handleLikeAction = this.handleLikeAction.bind(this)
    }

    handleLikeAction() {
        this.setState((prevState) => ({
            isStarred: !prevState.isStarred
        }));
    }

    render() {
        const { isStarred } = this.state;

        function heartIconClasses() {
            let defaultHeartIconClasses = "icofont-heart heart_icon ";
            return isStarred ? defaultHeartIconClasses + "is_starred" : defaultHeartIconClasses;
        }

        return (
            <i className={ heartIconClasses() } onClick={ this.handleLikeAction }>

            </i>
        );
    }
}
