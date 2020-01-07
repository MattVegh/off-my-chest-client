import React, { Component } from 'react'
import './App.css'
import { Route } from 'react-router-dom'
import Nav from './Nav/Nav'
import AllPosts from './AllPosts/AllPosts'
import Post from './Post/Post'
import NewPost from './NewPost/NewPost'


class App extends Component {
  // state = {
  //   posts: sampleData.posts,
  //   comments: sampleData.comments
  // }

  state = {
    posts: [],
    comments: [],
  }

  componentDidMount() {
    Promise.all([
      fetch(`https://off-my-chest-api.herokuapp.com/posts`),
      fetch(`https://off-my-chest-api.herokuapp.com/comments`)
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

  handleNewPost = (newPost) => {
    console.log('newpost from app', newPost)
    this.setState({
      posts: newPost
    })
    
  }

  render() {

    console.log('from app', this.state)

    return (
      <div className="App">
        <div className='app-container'>
          <Nav />
          <main role='main'>
            <Route exact path='/' component={(props) => {
              return <AllPosts
                {...props}
                posts={this.state.posts}
                comments={this.state.comments} />
            }}
            />

            <Route path='/posts/:postId' component={(props) => {
              return <Post
                {...props}
                posts={this.state.posts}
                comments={this.state.comments} />
            }}
            />
            <Route path='/newpost' component={(props) => {
              return <NewPost 
              {...props}
              posts={this.state.posts}
              handleNewPost={this.handleNewPost}
               />
            }} />
          </main>
        </div>
      </div>
    );
  }
}

export default App;
