import React from 'react';
import Dropzone from './Dropzone';
import DefaultUpload from './DefaultUpload';

function DataUploader(props) {
  return (
    <div>
      <Dropzone
        onDrop={json => console.log('=====json', json)}
      />
      <DefaultUpload
        onPress={json => console.log('=====json', json)}
      />
    </div>
  )
}

export default DataUploader;
