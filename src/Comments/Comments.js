import React, { Component } from 'react'
import './Comments.css'

export default class Comments extends Component {
    state = {
        displayContent: '',
        content: '',
        post_id: '',
        hidden: 'hidden',


    }

    componentDidMount() {
        const postComments = this.props.comments.filter(comments =>
            comments.post_id === parseInt(this.props.match.params.postId))

        this.setState({ comments: postComments })
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
                    : res.json().then(newComment => {
                        const comments = [...this.state.comments, ...newComment]
                        this.setState({ comments })
                    })
            )

            .catch(error => console.log(error))

        this.clearCommentInput()

    }

    clearCommentInput() {
        this.setState({
            displayContent: ''
        })
    }

    removeHidden = () => {

        this.setState({
            hidden: 'not-hidden'
        })

    }

    render() {
        const postComments = this.state.comments

        return (
            <div className='comments-container'>
                <div className='add-comment-container'>
                    <textarea type='text' className='comment-input' value={this.state.displayContent} onChange={this.handleComment} />
                    {this.state.content === ''
                        ? <button className='add-comment-btn' onClick={() => this.removeHidden()}>Add Comment</button>
                        : <button className='add-comment-btn' onClick={() => this.postComment()}>Add Comment</button>}
                    <div className={this.state.hidden} >Please input some content</div>

                </div>
                <div className='comments'>
                    {postComments && postComments.slice(0).reverse().map(comments =>
                        <p className='comment' key={comments.id}>{comments.content}</p>
                    )}
                </div>
            </div>
        )
    }
}