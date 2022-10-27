import React from 'react';
import Button from 'react-bootstrap/Button';
import { readString } from 'react-papaparse';
import dummyCsv from '../../data/dummy.csv';

function DefaultUploader(props) {
  const onClick = () => {
    const papaConfig = {
      complete: (results, file) => {
        results.data.pop();
        props.onPress(results.data);
      },
      download: true,
      header: true,
      error: (error, file) => {
        console.log('Error while parsing:', error, file);
      },
    };

    readString(dummyCsv, papaConfig);
  }

  return (
    <Button onClick={onClick}>USE DEFAULT CSV</Button>
  )
}

export default DefaultUploader;
