import React from 'react';
import {render} from 'react-dom';
import { HashRouter } from 'react-router-dom'
import ScrollToTop from './components/scroll-to-top.js'
import './index.css'
import App from './views/index.js';
import { CloudinaryContext } from 'cloudinary-react'
// import * as serviceWorker from './serviceWorker';

render(
  <CloudinaryContext cloudName={process.env.CLOUDINARY_NAME || 'aricma'}>
    <HashRouter>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </HashRouter>
  </CloudinaryContext>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
