import React, { Component } from 'react';
import "../../css/cards/SalesTag.css";


export default class SalesTag extends Component {
    render() {
        const { background_color, color, text } = this.props;

        const sales_tag_style = {
            "color": color,
            "backgroundColor": background_color
        }

        return (
            <p className="sales_tag" style={ sales_tag_style }>
                { text }
            </p>
        )
    }
}
