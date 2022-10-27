import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { getPatientById, getDoctorById } from '../../helpers';
import { EditIcon, EyeIcon, SaveIcon, DeleteIcon } from '../Icons';

function TableRow(props) {

  const [isDatetimeEdit, setIsDatetimeEdit] = useState(false);
  const [tempDatetime, setTempDatetime] = useState(props.appointment.datetime);
  const [datetimeError, setDatetimeError] = useState(false);

  const patient = getPatientById(props.patients, props.appointment.patient_id);
  const doctor = getDoctorById(props.doctors, props.appointment.doctor_id);
  // Only allow 8am - 4pm
  const isTimeValid = (dt) => {
    const mDatetime = moment(dt);
    const minutes = mDatetime.minutes() + mDatetime.hours() * 60;
    return minutes >= 480 && minutes <= 960;
  }

  return (
    <tr key={props.appointment.id}>
      <td>
        <Button size="sm" onClick={props.deleteAppointment}>
          <DeleteIcon />
        </Button>
      </td>
      <td>
        <div className="flex-row-center">
          {props.appointment.id}
        </div>
      </td>
      <td>
        <div className="flex-row-center">
          {isDatetimeEdit ? (
            <DateTimePicker
              value={new Date(tempDatetime)}
              onChange={val => {
                setTempDatetime(val);
                setDatetimeError(!isTimeValid(val));
              }}
              format="y-MM-dd h:mm:ss a"
              clearIcon={null}
            />
          ) : (
            <span>
              {props.appointment.datetime
                ? moment(props.appointment.datetime).format('YYYY-MM-DD h:mm:ss A')
                : ''}
            </span>
          )}

          <Button
            size="sm"
            style={{ marginLeft: 5 }}
            onClick={() => {
              if (isDatetimeEdit) {
                if (isTimeValid(tempDatetime)) {
                  props.updateAppointment('datetime', tempDatetime);
                }
                setIsDatetimeEdit(false);
                setDatetimeError(false);
              } else {
                setTempDatetime(props.appointment.datetime);
                setIsDatetimeEdit(true);
                setDatetimeError(false);
              }
            }}
          >
            {isDatetimeEdit ? <SaveIcon /> : <EditIcon />}
          </Button>
        </div>

        {datetimeError && (
          <div style={{ color: 'red' }}>Time should be between 8am to 4pm</div>
        )}
      </td>

      <td>
        <div className="flex-row-center">
          <div>{patient.name}</div>
          <Button
            size="sm"
            style={{ marginLeft: 5 }}
            onClick={() => props.setPatientProfile(patient)}
          >
            <EyeIcon />
          </Button>
          <Dropdown style={{ marginLeft: 5 }}>
            <DropdownButton
              variant="success"
              id="dropdown-pat"
              title={<EditIcon />}
              size="sm"
            >
              {props.patients.map(pat => (
                <Dropdown.Item
                  key={pat.id}
                  onClick={() => props.updateAppointment('patient_id', pat.id)}
                >
                  {pat.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Dropdown>
        </div>
      </td>

      <td>
        <div className="flex-row-center">
          <div>{doctor.name}</div>
          <Button
            size="sm"
            style={{ marginLeft: 5 }}
            onClick={() => props.setDoctorProfile(doctor)}
          >
            <EyeIcon />
          </Button>
          <Dropdown style={{ marginLeft: 5 }}>
            <DropdownButton
              variant="success"
              id="dropdown-doc"
              title={<EditIcon />}
              size="sm"
            >
              {props.doctors.map(doc => (
                <Dropdown.Item
                  key={doc.id}
                  onClick={() => props.updateAppointment('doctor_id', doc.id)}
                >
                  {doc.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Dropdown>
        </div>
      </td>
    </tr>
  )
}

export default TableRow;
