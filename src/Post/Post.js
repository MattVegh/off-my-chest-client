import React, { Component } from 'react'
import './Post.css'
import Comments from '../Comments/Comments'

export default class Post extends Component {

    render() {
        
        const findExactPost = this.props.posts.filter(post => post.id === parseInt(this.props.match.params.postId))
        const exactPost = findExactPost[0]

        return (
            <div>
                {!exactPost ? <div></div> :
                    <div className='post-with-comments-container'>
                        <div className='exact-post-container'>
                            <div className='post-title'>
                                <h3>{exactPost.title}</h3>
                            </div>
                            <p className='post-content'>{exactPost.content}</p>
                        </div>
                        <Comments comments={this.props.comments} {...this.props} />
                    </div>}
            </div>
        )
    }
}