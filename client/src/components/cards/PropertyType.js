import React, { Component } from 'react'

export default class PropertyType extends Component {
    render() {
        const { icon, name, is_selected } = this.props;

        return (
            <div 
                className={ 
                    is_selected ? 
                    "property_type selected_property" : 
                    "property_type" 
                }
            >
                <img src={ icon } alt="property_type_icon"></img>
                <p className="property_type_name">{ name }</p>
            </div>
        );
    }
}
