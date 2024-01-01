// AddText.js
import React, { useState } from 'react';
import { fabric } from 'fabric';

const AddText = ({ canvas }) => {
  const [text, setText] = useState('');

  const handleAddText = () => {
    if (canvas && text) {
      const textObject = new fabric.IText(text, {
        left: canvas.width / 2,
        top: canvas.height / 2,
        fontFamily: 'Arial',
        fill: '#000',
        lineHeight: 1.1,
        editable: true
      });

      canvas.centerObject(textObject);
      canvas.add(textObject);
      canvas.setActiveObject(textObject);
      canvas.requestRenderAll();
      setText(''); 
    }
  };

  return (
    <div>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here"
      />
      <button onClick={handleAddText}>Add Text</button>
    </div>
  );
};

export default AddText;

