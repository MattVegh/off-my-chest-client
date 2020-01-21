import React, { Component } from 'react'
import './NewPost.css'

export default class NewPost extends Component {
    state = {
        title: '',
        content: ''
    }

    handleTitle = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    handleContent = (event) => {
        this.setState({
            content: event.target.value
        })
    }

    postPost = (event) => {
        event.preventDefault()
        // fetch(`http://localhost:8000/posts`, {
        fetch(`https://off-my-chest-api.herokuapp.com/posts`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                content: this.state.content
            })
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            )
            .then((post) => {
                this.props.handleNewPost(post)

                this.props.history.push(`/posts/${post[0].id}`)
            })
            .catch(error => console.log(error))
    }

    sendToHome = () => {

        this.props.history.push(`/posts/${this.state.newPost[0].id}`)
    }



    render() {

        const { title, content } = this.state
        const isEnabled = title.length > 0 && content.length > 0

        return (
            <div className='form-container'>
                <form className='new-post-form' >
                    <div className='new-post-container' >
                        <label htmlFor='new-post-title' >Title: </label>
                        <textarea type='text' className='new-post-title' onChange={this.handleTitle} />
                        <label htmlFor='new-post-content' >Content: </label>
                        <textarea type='text' className='new-post-content' onChange={this.handleContent} />
                    </div>
                    <button disabled={!isEnabled} className='post-btn' onClick={(event) => this.postPost(event)}>Post</button>
                </form>
            </div>
        )
    }
}
