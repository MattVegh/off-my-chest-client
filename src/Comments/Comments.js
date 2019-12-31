import React, { Component } from 'react'
import './Comments.css'
import { Link } from 'react-router-dom'
import SampleData from '../sample-data'


export default class Comments extends Component {
    render() {
        console.log('from comments', this.props)
        console.log('comments match', this.props.match)
        const postComments = this.props.comments.filter(comments => comments.postId === parseInt(this.props.match.params.postId))
        console.log('postcomments', postComments)

        return (
            <div className='comments-container'>
                <div className='add-comment-container'>
                    <input type='text' className='comment-input' />
                    <Link to='' className='add-comment-link'>Add Comment</Link>

                </div>

                {postComments.map(comments =>
                    <p className='comment' key={comments.id}>{comments.content}</p>
                    )}
                
            </div>
        )
    }
}