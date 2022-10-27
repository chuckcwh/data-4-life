import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import DataUploader from './components/DataUploader';
import { processData } from './helpers';

function App() {

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const onDataLoad = (data) => {
    const { patients, doctors, appointments } = processData(data);
    console.log({ patients, doctors, appointments });
    setPatients(patients);
    setDoctors(doctors);
    setAppointments(appointments);
  }

  return (
    <div className="App">
      <DataUploader onLoad={onDataLoad} />
      {/*
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      */}
    </div>
  );
}

export default App;
