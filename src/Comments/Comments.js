import React, { Component } from 'react'
import './Comments.css'
//import sampleData from '../sample-data'


export default class Comments extends Component {
    state = {
        content: '',
        post_id: ''
    }


    handleComment = (event) => {
        let postId = parseInt(this.props.match.params.postId)
        this.setState({
            content: event.target.value,
            post_id: postId
        })
    }


    postComment = () => {
        fetch('http://localhost:8000/comments', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                content: this.state.content,
                post_id: this.state.post_id
            })
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject('e', e))
                    : res.json()
            )
            .catch(error => console.log(error))
            .then(this.getUpdatedComments())

    }

    getUpdatedComments = () => {
        fetch('http://localhost:8000/comments')
                .then(response => response.json())
                .then((responseJson) => console.log('get repsonse', responseJson))
    }

    render() {
        console.log(this.state)
        console.log('from comments', this.props)
        // console.log('comments match', this.props.match)
        const postComments = this.props.comments.filter(comments => comments.post_id === parseInt(this.props.match.params.postId))

        console.log('postcomments', postComments)

        return (
            <div className='comments-container'>
                <div className='add-comment-container'>
                    <input type='text' className='comment-input' onChange={this.handleComment} />
                    <button className='add-comment-btn' onClick={() => this.postComment()}>Add Comment</button>

                </div>

                {postComments.slice(0).reverse().map(comments =>
                    <p className='comment' key={comments.id}>{comments.content}</p>
                )}

            </div>
        )
    }
}