import React from 'react';
import Dropzone from './Dropzone';
import DefaultUpload from './DefaultUpload';

function DataUploader(props) {
  return (
    <div className="flex-row-center" style={{ marginTop: 20 }}>
      <Dropzone
        onDrop={props.onLoad}
      />
      <div style={{ marginLeft: 5 }}>
        <DefaultUpload
          onPress={props.onLoad}
        />
      </div>
    </div>
  )
}

export default DataUploader;
