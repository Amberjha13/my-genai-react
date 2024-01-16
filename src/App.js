import React from 'react';
// import SentimentAnalysis from './SentimentAnalysis';
// import NLPTable from './NLPTable';
import TableComponent from './TableComponent';
import DropdownCheckbox from './DropdownCheckbox'
import './App.css';

function App() {
  return (
    <div className="App">
     {/* <SentimentAnalysis /> */}
     <TableComponent/>
     <DropdownCheckbox/>
    </div>
  );
}

export default App;
