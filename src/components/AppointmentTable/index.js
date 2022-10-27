import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import moment from 'moment';
import Filters from './Filters';
import TableRow from './TableRow';

function AppointmentTable(props) {
  const renderRows = () => {
    if (!props.filteredAppointments?.length) {
      return null;
    }

    return props.filteredAppointments.map(appt => {
      return (
        <TableRow
          key={appt.id}
          patients={props.patients}
          doctors={props.doctors}
          appointment={appt}
          updateAppointment={(field, value) => {
            const apptIdx = props.appointments.findIndex(appointment => appt.id === appointment.id);
            const updated = [...props.appointments];
            updated[apptIdx][field] = value;
            props.setAppointments(updated);
          }}
          deleteAppointment={() => props.deleteAppointment(appt.id)}
          setPatientProfile={props.setPatientProfile}
          setDoctorProfile={props.setDoctorProfile}
        />
      )
    });
  }

  return (
    <section style={{ marginTop: 20 }}>
      <Filters
        selected={props.filters}
        doctors={props.doctors}
        patients={props.patients}
        dates={props.dates}
        setFilters={props.setFilters}
      />

      <div style={{ margin: 20 }}>
        <div className="title">Appointments</div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>id</th>
              <th>Datetime</th>
              <th>Patient</th>
              <th>Doctor</th>
            </tr>
          </thead>
          <tbody>
            {renderRows()}
          </tbody>
        </Table>
      </div>
    </section>
  )
}

AppointmentTable.defaultProps = {
  appointments: [],
  doctors: [],
  patients: [],
}

export default AppointmentTable;
