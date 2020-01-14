import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App'
import NewPost from './NewPost'
import { BrowserRouter } from "react-router-dom";

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BrowserRouter>
        <App >
            <NewPost />
        </App>
    </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
    
});