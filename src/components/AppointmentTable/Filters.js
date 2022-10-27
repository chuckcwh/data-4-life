import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function Filters(props) {

  const onFilter = (field, value) => {
    props.setFilters({
      ...(props.selected || {}),
      [field]: value,
    });
  }

  return (
    <div className="flex-row-center">
      Filters:
      <Dropdown style={{ marginLeft: 5 }}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {props.selected?.date || '-- Select Date --'}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => onFilter('date', null)}>
            -- Clear --
          </Dropdown.Item>
          {props.dates.map(date => (
            <Dropdown.Item
              key={date}
              onClick={() => onFilter('date', date)}
            >
              {date}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown style={{ marginLeft: 5 }}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {props.selected?.patient
            ? props.selected?.patient?.name
            : '-- Select Patient --'
          }
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => onFilter('patient', null)}>
            -- Clear --
          </Dropdown.Item>
          {props.patients.map(pat => (
            <Dropdown.Item
              key={pat.id}
              onClick={() => onFilter('patient', pat)}
            >
              {pat.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>

      <Dropdown style={{ marginLeft: 5 }}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {props.selected?.doctor
            ? props.selected?.doctor?.name
            : '-- Select Doctor --'
          }
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => onFilter('doctor', null)}>
            -- Clear --
          </Dropdown.Item>
          {props.doctors.map(doc => (
            <Dropdown.Item
              key={doc.id}
              onClick={() => onFilter('doctor', doc)}
            >
              {doc.name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

Filters.defaultProps = {
  doctors: [],
  selected: null,
}

export default Filters;
