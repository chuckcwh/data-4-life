import React from 'react';
import Table from 'react-bootstrap/Table';

function Profile(props) {
  if (!props.data) {
    return null;
  }

  const dataKeys = Object.keys(props.data);

  return (
    <section style={{ margin: 20 }}>
      <div>{props.header}</div>

      <Table striped bordered hover>
        <thead>
          <tr>
            {dataKeys.map(dataKey => (
              <th key={dataKey}>{dataKey}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {dataKeys.map(dataKey => (
              <td key={dataKey}>{props.data[dataKey]}</td>
            ))}
          </tr>
        </tbody>
      </Table>
    </section>
  )
}

export default Profile;
