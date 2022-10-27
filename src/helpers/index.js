// Define unique column keys
const PATIENT_ID = 'patient_id';
const PATIENT_NAME = 'patient_name';
const PATIENT_GENDER = 'patient_gender';
const PATIENT_AGE = 'patient_age';
const DOCTOR_ID = 'doctor_id';
const DOCTOR_NAME = 'doctor_name';
const APPOINTMENT_ID = 'appointment_id';
const APPOINTMENT_DATETIME = 'appointment_datetime';

export const processData = data => {
  const patients = [];
  const doctors = [];
  const appointments = [];

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

      // NOTE: do not update doctor data if exists! Treat first existed doctor as source of truth
      const shouldAddAppointment = datum[APPOINTMENT_ID]
        && !appointments.find(d => d.id === datum[APPOINTMENT_ID]);
      if (shouldAddAppointment) {
        const newAppointment = {
          id: datum[APPOINTMENT_ID],
          datetime: datum[APPOINTMENT_DATETIME],
          doctor_id: datum[DOCTOR_ID],
          patient_id: datum[PATIENT_ID],
        }
        appointments.push(newAppointment);
      }
    })
  }

  return {
    patients,
    doctors,
    appointments,
  }
}
