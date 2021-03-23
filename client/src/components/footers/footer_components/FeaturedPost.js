import React, { Component } from 'react'


class FeaturedPost extends Component {
    render() {
        const { post_img_url, post_tags, post_title, post_desc } = this.props;

        function buildPostTags() {
            let postTags = [];

            for(const index in post_tags) {
                postTags.push(
                    <li key={ index } className="post_tag">{ post_tags[index] }</li>
                )
            }

            return postTags;
        }

        return (
            <div className="featured_post">
                <img src={ post_img_url } alt="featured_post_image"></img>
                <div className="post_details">
                    <ul className="post_tags">
                        { buildPostTags() }
                    </ul>

                    <p className="post_title">{ post_title }</p>
                    <p className="post_desc">
                        { post_desc }
                    </p>
                </div>
            </div>
        )
    }
}

export default FeaturedPost;
