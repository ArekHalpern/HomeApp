import React, { useState, useCallback } from 'react';
import CanvasGrid from './CanvasGrid';
import DragDropContainer from './DragDropContainer';
import SideNav from './SideNav';

const ImageEditor = () => {
  const [canvas, setCanvas] = useState(null);

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      fabric.Image.fromURL(event.target.result, (img) => {
        // Scale the image to fit the canvas
        var scaleFactor = Math.min(canvas.width / img.width, canvas.height / img.height);
        img.scale(scaleFactor).set({
          left: canvas.width / 2 - (img.width * scaleFactor) / 2,
          top: canvas.height / 2 - (img.height * scaleFactor) / 2,
        });

        canvas.add(img).renderAll();
      });
    };
    reader.readAsDataURL(file);
  }, [canvas]);

  return (
    <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <DragDropContainer onDrop={onDrop} />
      <CanvasGrid setCanvas={setCanvas} />
    </div>
  );
};

export default ImageEditor;
