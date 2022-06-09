import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "@fontsource/press-start-2p";
import './index.css';
import { MoralisProvider } from 'react-moralis';

// const APP_ID = process.env.APP_ID;
// const SERVER_URL = process.env.SERVER_URL;
const APP_ID = "7eQm2cJULhF5ds8x72AjjpUslM7LuoLknjmpfsfD";
const SERVER_URL = "https://83uzhkjqegzt.usemoralis.com:2053/server";
console.log(APP_ID)

const Application = () => {
  if (!APP_ID || !SERVER_URL)
    throw new Error(
      "Missing Moralis Application ID or Server URL. Make sure to set your .env file.",
  );
  return (
    <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
      <App />
    </MoralisProvider>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
