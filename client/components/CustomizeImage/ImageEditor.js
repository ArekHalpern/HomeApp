import React, { useState, useCallback, useEffect, useRef } from 'react';
import CanvasGrid from './CanvasGrid';
import DragDropContainer from './DragDropContainer';
import AddText from './AddText';

const ImageEditor = () => {
  const [canvas, setCanvas] = useState(null);
  const [selectedObject, setSelectedObject] = useState(null);
  const editorRef = useRef(null);

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      fabric.Image.fromURL(event.target.result, (img) => {
        var scaleFactor = Math.min(canvas.width / img.width, canvas.height / img.height);
        img.scale(scaleFactor).set({
          left: canvas.width / 2 - (img.width * scaleFactor) / 2,
          top: canvas.height / 2 - (img.height * scaleFactor) / 2,
        });
        canvas.add(img);
        console.log('Image added to canvas:', img);
        canvas.renderAll();
      });
    };
    reader.readAsDataURL(file);
  }, [canvas]);

  useEffect(() => {
    if (canvas) {
      console.log('Canvas is set:', canvas);

      if (editorRef.current) {
        editorRef.current.focus();
        console.log("Focused on editorRef");
      }

      const handleKeyDown = (e) => {
        if (e.key === 'Backspace') {
          let activeObject = canvas.getActiveObject();
          if (activeObject) {
            console.log('Deleting object:', activeObject);
            canvas.remove(activeObject);
            canvas.discardActiveObject().renderAll();
            console.log('Object deleted');
          } else {
            console.log('No object selected');
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [canvas]);

  const handleDownload = () => {
    if (canvas) {
      console.log('Preparing to download image...');
      const dataUrl = canvas.toDataURL({
        format: 'png',
        quality: 1,
      });
      console.log('Data URL:', dataUrl);
      const link = document.createElement('a');
      link.download = 'canvas-image.png';
      link.href = dataUrl;
      try {
        link.click();
        console.log('Download should now be triggered.');
      } catch (error) {
        console.error('Error during download:', error);
      }
    } else {
      console.log('No canvas found to download from.');
    }
  };

  return (
    <div 
      ref={editorRef}
      style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      tabIndex="0">
      <DragDropContainer onDrop={onDrop} />
      <AddText canvas={canvas} />
      <CanvasGrid setCanvas={setCanvas} />
      <button onClick={handleDownload} style={{ marginTop: '10px' }}>Download Image</button>
    </div>
  );
};

export default ImageEditor;