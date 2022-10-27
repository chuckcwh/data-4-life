import React from 'react';
import Dropzone from './Dropzone';
import DefaultUpload from './DefaultUpload';

function DataUploader(props) {
  return (
    <div>
      <Dropzone
        onDrop={props.onLoad}
      />
      <DefaultUpload
        onPress={props.onLoad}
      />
    </div>
  )
}

export default DataUploader;
