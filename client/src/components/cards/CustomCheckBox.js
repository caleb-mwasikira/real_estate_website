import React, { Component } from 'react';
import "../../css/cards/CustomCheckBox.css";


export default class CustomCheckBox extends Component {
    render() {
        const { name } = this.props;

        return (
            <div className="form-group">
                <label className="checkbox">
                    <input type="checkbox" />
                    <div>
                        <p className="checkbox-text">{ name }</p>
                    </div>
                </label>
            </div>
        );
    }
}
