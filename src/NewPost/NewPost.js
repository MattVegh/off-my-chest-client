import React, { Component } from 'react'
import './NewPost.css'
import { Link } from 'react-router-dom'

export default class NewPost extends Component {

    render() {

        return (
            <div className='form-container'>
            <form className='new-post-form'>
                <div className='new-post-container'>
                    <label htmlFor='new-post-title' >Title: </label>
                    <input type='text' className='new-post-title' />
                    <label htmlFor='new-post-content' >Content: </label>
                    <input type='text' className='new-post-content' />
                </div>
                    <button>Post</button>
            </form>
            </div>
                    )
                }
            }
