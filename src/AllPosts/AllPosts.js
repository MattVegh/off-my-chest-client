import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './AllPosts.css'
//import SampleData from '../sample-data'

export default class AllPosts extends Component {
    state = {
        posts: [],
        comments: [],
      }

    componentDidMount() {
        Promise.all([
          fetch(`http://localhost:8000/posts`),
          fetch(`http://localhost:8000/comments`)
        ])
          .then(([postsRes, commentsRes]) => {
            if (!postsRes.ok)
              return postsRes.json().then(e => Promise.reject(e));
            if (!commentsRes.ok)
              return commentsRes.json().then(e => Promise.reject(e));
    
            return Promise.all([postsRes.json(), commentsRes.json()]);
          })
          .then(([posts, comments]) => {
            this.setState({ posts, comments });
          })
          .catch(error => {
            console.error({ error });
          });
      }

    render() {

        let posts = this.state.posts
        console.log('posts', posts)

        console.log('all posts state', this.state)

        return (
            <div className='all-posts-container'>

                {posts.slice(0).reverse().map(post =>
                    <Link to={`/posts/${post.id}`} className='post-link' key={post.id}>
                        <div className='post-container'>
                            <div className='post-title'>
                                <h3>{post.title}</h3>
                            </div>
                            <p className='post-content'>{post.content}</p>
                        </div>
                    </Link>
                )}

            </div>
        )
    }
}