import React, { Component } from 'react'
import './App.css'
import { Route, withRouter } from 'react-router-dom'
import Nav from './Nav/Nav'
import AllPosts from './AllPosts/AllPosts'
import Post from './Post/Post'
import NewPost from './NewPost/NewPost'
import sampleData from './sample-data'

class App extends Component {
  state = {
    posts: sampleData.posts,
    comments: sampleData.comments
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
            <Route path='/newpost' component={NewPost} />
          </main>
        </div>
      </div>
    );
  }
}

export default App;
