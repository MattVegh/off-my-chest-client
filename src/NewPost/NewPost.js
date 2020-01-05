import React, { Component } from 'react'
import './NewPost.css'
import { Link } from 'react-router-dom'

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
        fetch(`http://localhost:8000/posts`, {
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
                 .catch(error => console.log(error))
    }

    render() {

        console.log('NewPost state', this.state)

        return (
            <div className='form-container'>
            <form className='new-post-form'>
                <div className='new-post-container'>
                    <label htmlFor='new-post-title' >Title: </label>
                    <input type='text' className='new-post-title' onChange={this.handleTitle}/>
                    <label htmlFor='new-post-content' >Content: </label>
                    <input type='text' className='new-post-content' onChange={this.handleContent}/>
                </div>
                    <button className='post-btn' onClick={(event) => this.postPost(event)}>Post</button>
            </form>
            </div>
                    )
                }
            }
