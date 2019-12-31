import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'

export default function Nav() {
    return (
        <nav>
            
            <div className='titles'>
                <Link to='/' className='main-title'>Off My Chest</Link>
            </div>
            <div className='link-container'>
                <Link to='/newpost' className='make-post-link'>New Post</Link>
            </div>
        </nav>
    )
}