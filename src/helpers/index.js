import moment from 'moment';
import {
  PATIENT_ID,
  PATIENT_NAME,
  PATIENT_GENDER,
  PATIENT_AGE,
  DOCTOR_ID,
  DOCTOR_NAME,
  APPOINTMENT_ID,
  APPOINTMENT_DATETIME,
} from '../consts';

export const processData = data => {
  const patients = [];
  const doctors = [];
  const appointments = [];
  const dates = [];

  if (Array.isArray(data) && data.length) {
    console.log('=====data', data);
    data.forEach(datum => {
      // NOTE: do not update patient data if exists! Treat first existed patient as source of truth
      const shouldAddPatient = datum[PATIENT_ID]
        && !patients.find(p => p.id === datum[PATIENT_ID]);
      if (shouldAddPatient) {
        const newPatient = {
          id: datum[PATIENT_ID],
          name: datum[PATIENT_NAME],
          gender: datum[PATIENT_GENDER],
          age: datum[PATIENT_AGE],
        };
        patients.push(newPatient);
      }

      // NOTE: do not update doctor data if exists! Treat first existed doctor as source of truth
      const shouldAddDoctor = datum[DOCTOR_ID]
        && !doctors.find(d => d.id === datum[DOCTOR_ID]);
      if (shouldAddDoctor) {
        const newDoctor = {
          id: datum[DOCTOR_ID],
          name: datum[DOCTOR_NAME],
        };
        doctors.push(newDoctor);
      }

      // NOTE: do not update appointment data if exists! Treat first existed appointment as source of truth
      const shouldAddAppointment = datum[APPOINTMENT_ID]
        && !appointments.find(d => d.id === datum[APPOINTMENT_ID]);
      if (shouldAddAppointment) {
        const formatDatetime = datum[APPOINTMENT_DATETIME]
          && moment(datum[APPOINTMENT_DATETIME], 'DDMMYYYY HH:mm:ss').toISOString();
        const newAppointment = {
          id: datum[APPOINTMENT_ID],
          datetime: formatDatetime,
          doctor_id: datum[DOCTOR_ID],
          patient_id: datum[PATIENT_ID],
        }
        appointments.push(newAppointment);
      }

      const newDate = datum[APPOINTMENT_DATETIME]
        && moment(datum[APPOINTMENT_DATETIME], 'DDMMYYYY').format('YYYY-MM-DD');
      const shouldAddDate = newDate && !dates.find(d => d === newDate);
      if (shouldAddDate) {
        dates.push(newDate);
      }
    })
  }

  return {
    patients,
    doctors,
    appointments,
    dates,
  }
}

export const getDoctorById = (doctors, id) => {
  if (!doctors?.length || !id) {
    return '';
  }
  return doctors.find(doc => doc.id === id) || '';
}

export const getPatientById = (patients, id) => {
  if (!patients?.length || !id) {
    return '';
  }
  return patients.find(pat => pat.id === id) || '';
}
