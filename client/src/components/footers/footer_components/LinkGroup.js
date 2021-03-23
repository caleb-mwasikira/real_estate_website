import React, { Component } from 'react'


class LinkGroup extends Component {
    render() {
        const { footerLinksTitle, footerLinks } = this.props;

        function buildFooterLinksList() {
            let footerLinksList = [];

            for(const key in footerLinks) {
                footerLinksList.push(
                    <li key={ key } className="footer_link">
                        <a href={ footerLinks[key] }>{ key }</a>
                    </li>
                );
            }

            return footerLinksList;
        }


        return (
            <ul className="link_group">
                <p className="title">{ footerLinksTitle }</p>
                
                { buildFooterLinksList() }
            </ul>
        )
    }
}


export default LinkGroup;