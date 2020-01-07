import React, { Component } from 'react'
import './Comments.css'

export default class Comments extends Component {
    state = {
        content: '',
        post_id: '',
        
    }


    handleComment = (event) => {
        let postId = parseInt(this.props.match.params.postId)
        this.setState({
            content: event.target.value,
            post_id: postId
        })
    }


    postComment = () => {
        fetch('https://off-my-chest-api.herokuapp.com/comments', {
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
                    : res.json().then(this.setState({
                        newComment: this.state.content
                    }))
            )
            .catch(error => console.log(error))

    }

    render() {
        console.log('state in comments', this.state)
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
                {!this.state.newComment ? <div></div> : <p className='comment' >{this.state.newComment}</p>}
                {postComments.slice(0).reverse().map(comments =>
                    <p className='comment' key={comments.id}>{comments.content}</p>
                )}

            </div>
        )
    }
}