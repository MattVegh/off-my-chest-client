import React, { Component } from 'react'
import './Post.css'
import SampleData from '../sample-data'
import Comments from '../Comments/Comments'

export default class Post extends Component {

    render() {
        console.log('from post.js', this.props.posts)
        console.log('match', this.props.match.params.postId)
        const findExactPost = this.props.posts.filter(post => post.id === parseInt(this.props.match.params.postId))
        const exactPost = findExactPost[0]
        console.log('find exact post', findExactPost[0])
        console.log('exact post', exactPost)

        return (
            <div className='post-with-comments-container'>
                <div className='exact-post-container'>
                    <div className='post-title'>
                        <h3>{exactPost.title}</h3>
                    </div>
                    <p className='post-content'>{exactPost.content}</p>
                </div>
                <Comments comments={this.props.comments} {...this.props}/>
            </div>
        )
    }
}