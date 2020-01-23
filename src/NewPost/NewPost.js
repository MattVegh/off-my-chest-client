import React, { Component } from 'react'
import './NewPost.css'

export default class NewPost extends Component {
    state = {
        title: '',
        content: '',
        hidden: 'hidden'
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

    removeHidden = (event) => {
        event.preventDefault()
        this.setState({
            hidden: 'not-hidden'
        })
        
    }

    render() {
        
        return (
            <div className='form-container'>
                <form className='new-post-form' >
                    <div className='new-post-container' >
                        <label htmlFor='new-post-title' >Title: </label>
                        <textarea type='text' className='new-post-title' onChange={this.handleTitle} />
                        <label htmlFor='new-post-content' >Content: </label>
                        <textarea type='text' className='new-post-content' onChange={this.handleContent} />
                    </div>
                    {this.state.title  === '' || this.state.content === ''
                    ? <button className='post-btn' onClick={(event) => this.removeHidden(event)}>Post</button> 
                    : <button className='post-btn' onClick={(event) => this.postPost(event)}>Post</button>}
                    <div className={this.state.hidden} >Please fill out the title and content boxes</div>
                    
                </form>
            </div>
        )
    }
}
