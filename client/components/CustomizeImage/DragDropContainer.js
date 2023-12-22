import React from 'react';
import { useDropzone } from 'react-dropzone';

const DragDropContainer = ({ onDrop }) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, noClick: true });

  return (
    <div {...getRootProps()} style={{ 
      border: '2px dashed #ccc', 
      borderRadius: '10px', 
      padding: '20px', 
      textAlign: 'center', 
      width: '250px',
      height: '120px',
      transition: 'border-color 0.3s',
      borderColor: isDragActive ? '#666' : '#ccc',
      cursor: 'pointer'
    }}>
     <input {...getInputProps()} id="dropzone-input" />
      <p>Drop or Upload</p>
      <button type="button" onClick={() => document.getElementById('dropzone-input').click()} style={{ marginTop: '10px' }}>
        Upload Image
      </button>
    </div>
  );
};

export default DragDropContainer;