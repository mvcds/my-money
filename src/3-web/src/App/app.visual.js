import React from 'react';
import { NotificationContainer } from 'react-notifications';
import './app.css';
import 'react-notifications/lib/notifications.css';

import FinancialScenario from './FinancialScenario'

function App({ isLoading, hasLoadingError, ...props }) {
  const Content = isLoading ? Loading : (hasLoadingError ? Failure : Pages)

  return (
    <div className="App">
      <NotificationContainer/>
      <main className="App-main">
        <Content {...props} />
      </main>
    </div>
  );
}

function Loading() {
  return (<span>LOADING...</span>)
}

function Failure() {
  return (
    <p>
      The app is not working right now<br/>
      Retry in a few minutes
    </p>
  )
}

function Pages({ onCreateEntry, onReadScenario }) {
  return (
    <React.Fragment>
      <FinancialScenario onCreateEntry={onCreateEntry} onReadScenario={onReadScenario} />
    </React.Fragment>
  )
}

export default App;
