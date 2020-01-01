import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import CreateEntry from 'my-adapters/controllers/entry/create'

import storage from './Storage'

const app = {
  storage,
  notifier: {
    onError: (msg) => console.log('error', msg)
  },
}

app.createEntry = new CreateEntry(app).create

ReactDOM.render(<App app={app} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
