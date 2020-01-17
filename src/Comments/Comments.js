import React, { Component } from 'react'
import './Comments.css'

export default class Comments extends Component {
    state = {
        displayContent: '',
        content: '',
        post_id: '',

    }


    handleComment = (event) => {
        let postId = parseInt(this.props.match.params.postId)
        this.setState({
            displayContent: event.target.value,
            content: event.target.value,
            post_id: postId
        })
    }


    postComment = () => {
        // fetch(`http://localhost:8000/comments`, {
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

            this.clearCommentInput()
            
    }

    clearCommentInput() {
        this.setState({
            displayContent: ''
        })
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
                    <textarea type='text' className='comment-input' value={this.state.displayContent} onChange={this.handleComment} />
                    <button className='add-comment-btn' onClick={() => this.postComment()}>Add Comment</button>

                </div>
                <div className='comments'>
                    {!this.state.newComment ? <div></div> : <p className='comment' >{this.state.newComment}</p>}
                    {postComments.slice(0).reverse().map(comments =>
                        <p className='comment' key={comments.id}>{comments.content}</p>
                    )}
                </div>
            </div>
        )
    }
}