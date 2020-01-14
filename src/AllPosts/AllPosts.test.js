import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App'
import AllPosts from './AllPosts'
import { BrowserRouter } from "react-router-dom";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
        <App >
            <AllPosts />
        </App>
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
    
});