import './index.css';
import 'antd/dist/antd.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from 'src/app/components';
import reportWebVitals from './reportWebVitals';
import { logJS } from 'src/utils/logging';
import { setOptions } from 'skandha';

// @ts-ignore
window.logJS = logJS;

setOptions({ logging: true });

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
