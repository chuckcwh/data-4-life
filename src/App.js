import React, { useState } from 'react';
import logo from './logo.svg';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import DataUploader from './components/DataUploader';
import AppointmentTable from './components/AppointmentTable';
import Profile from './components/Profile';
import { processData } from './helpers';

function App() {

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [dates, setDates] = useState([]);

  const [filters, setFilters] = useState({});
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [patientProfile, setPatientProfile] = useState(null);
  const [doctorProfile, setDoctorProfile] = useState(null);

  const onDataLoad = (data) => {
    const { patients, doctors, appointments, dates } = processData(data);
    setPatients(patients);
    setDoctors(doctors);
    setAppointments(appointments);
    setDates(dates);

    // Clean out selected
    setFilters({});
    setFilteredAppointments(appointments);
    setPatientProfile(null);
    setDoctorProfile(null);
  }

  const onSetFilteredAppointments = (newAppointments, newFilters) => {
    let filtered = newAppointments;

    if (newFilters.doctor?.id) {
        filtered = filtered.filter(appt => appt.doctor_id === newFilters.doctor.id);
    }

    if (newFilters.patient?.id) {
        filtered = filtered.filter(appt => appt.patient_id === newFilters.patient.id);
    }

    if (newFilters.date) {
      filtered = filtered.filter(appt => moment(appt.datetime).isSame(newFilters.date, 'day'));
    }

    setFilteredAppointments(filtered);
  }

  const onSetDates = newAppointments => {
    const newDates = [];

    newAppointments.forEach(appt => {
      const newDate = appt.datetime
        && moment(appt.datetime).format('YYYY-MM-DD');
      const shouldAddDate = newDate && !newDates.find(d => d === newDate);
      if (shouldAddDate) {
        newDates.push(newDate);
      }
    })

    setDates(newDates);
  }

  const onSetFilters = newFilters => {
    setFilters(newFilters);
    onSetFilteredAppointments(appointments, newFilters);
  }

  const onSetAppointments = newAppointments => {
    setAppointments(newAppointments);
    onSetFilteredAppointments(newAppointments, filters);
    onSetDates(newAppointments);
  }

  const onDeleteAppointment = apptId => {
    const newAppointments = appointments.filter(appt => appt.id !== apptId);
    setAppointments(newAppointments);
    onSetFilteredAppointments(newAppointments, filters);
    onSetDates(newAppointments);
  }

  console.log({ patientProfile, doctorProfile });

  return (
    <div className="App">
      <DataUploader onLoad={onDataLoad} />

      <AppointmentTable
        doctors={doctors}
        patients={patients}
        appointments={appointments}
        filteredAppointments={filteredAppointments}
        dates={dates}
        filters={filters}
        setAppointments={onSetAppointments}
        setFilters={onSetFilters}
        deleteAppointment={onDeleteAppointment}
        setPatientProfile={setPatientProfile}
        setDoctorProfile={setDoctorProfile}
      />

      <Profile
      />
    </div>
  );
}

export default App;
