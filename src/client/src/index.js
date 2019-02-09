import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './views/index.js';
import { CloudinaryContext } from 'cloudinary-react'
// import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <CloudinaryContext cloudName={process.env.CLOUDINARY_NAME || 'aricma'}>
    <HashRouter>
      <App />
    </HashRouter>
  </CloudinaryContext>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
