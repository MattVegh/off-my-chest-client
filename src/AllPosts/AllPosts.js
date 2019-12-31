import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './AllPosts.css'
import SampleData from '../sample-data'

export default class AllPosts extends Component {


    render() {

        let posts = this.props.posts
        console.log('posts', posts)

        return (
            <div className='all-posts-container'>

                {posts.map(post =>
                    <Link to={`/posts/${post.id}`} className='post-link' key={post.id}>
                        <div className='post-container'>
                            <div className='post-title'>
                                <h3>{post.title}</h3>
                            </div>
                            <p className='post-content'>{post.content}</p>
                        </div>
                    </Link>
                )}

            </div>
        )
    }
}