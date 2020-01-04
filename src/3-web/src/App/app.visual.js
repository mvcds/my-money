import React from 'react';
import { NotificationContainer } from 'react-notifications';
import './app.css';
import 'react-notifications/lib/notifications.css';

import FinancialScenario from './FinancialScenario'

function App({ isLoading, onCreateEntry, onReadScenario }) {
  return (
    <div className="App">
      <NotificationContainer/>
      <main className="App-main">
        {isLoading ? <Loading /> : <FinancialScenario onCreateEntry={onCreateEntry} onReadScenario={onReadScenario} />}
      </main>
    </div>
  );
}

function Loading() {
  return (<span>LOADING...</span>)
}

export default App;
