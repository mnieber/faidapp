import React from 'react';
import ReactDOM from 'react-dom';
import { setOptions } from 'skandha';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { App } from 'src/app/components';
import { logJS } from 'src/utils/logging';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './uikit.scss';

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
