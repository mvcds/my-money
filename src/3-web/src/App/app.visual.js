import React from 'react';
import './app.css';

import FinancialScenario from './FinancialScenario'

function App({ isLoading, onCreateEntry }) {
  return (
    <div className="App">
      <main className="App-main">
        {isLoading ? <Loading /> : <FinancialScenario onCreateEntry={onCreateEntry} />}
      </main>
    </div>
  );
}

function Loading() {
  return (<span>LOADING...</span>)
}

export default App;
