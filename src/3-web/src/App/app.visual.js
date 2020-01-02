import React from 'react';
import './app.css';

import FinancialScenario from './FinancialScenario'

function App({ isLoading, onCreateEntry, onReadScenario }) {
  return (
    <div className="App">
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
