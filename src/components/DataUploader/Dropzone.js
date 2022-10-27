import React, { useCallback } from 'react';
import Dropzone from 'react-dropzone';
import csv from 'csvtojson';

function MyDropzone(props) {

  // Generate json from uploaded csv
  const onDrop = acceptedFiles => {
    // Do something with the files
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = async() => {
        const fileAsBinaryString = reader.result;

        const csvRows = await csv({
          noheader: true,
          output: "json"
        }).fromString(fileAsBinaryString);

        const toJson = []
        csvRows.forEach((row, i) => {

          if (i !== 0) {
            const builtObject = {}

            Object.keys(row).forEach((rowKey) => {
              const valueToAddInBuiltObject = row[rowKey];
              const keyToAddInBuiltObject = csvRows[0][rowKey];
              builtObject[keyToAddInBuiltObject] = valueToAddInBuiltObject;
            })

            toJson.push(builtObject)
          }
        })

        props.onDrop(toJson)
      }
      reader.readAsBinaryString(file);
    })
  };

  return (
    <Dropzone onDrop={onDrop}>
      {({getRootProps, getInputProps}) => (
        <section>
          <div {...getRootProps({ className: 'dropzone' })}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
          </div>
        </section>
      )}
    </Dropzone>
  )
}

export default MyDropzone;
