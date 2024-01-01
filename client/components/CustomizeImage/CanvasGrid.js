import React, { useRef, useEffect } from 'react';
import { fabric } from 'fabric';

const CanvasGrid = ({ setCanvas }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const newCanvas = new fabric.Canvas(canvasRef.current, {
      selection: false // Disable group selection
    });
    setCanvas(newCanvas);


    const gridSize = 10; 
    for (var i = 0; i < (newCanvas.width / gridSize); i++) {
      newCanvas.add(new fabric.Line([i * gridSize, 0, i * gridSize, newCanvas.height], { stroke: 'rgba(204, 204, 204, 0.5)', selectable: false })); // Semi-transparent lines
      newCanvas.add(new fabric.Line([0, i * gridSize, newCanvas.width, i * gridSize], { stroke: 'rgba(204, 204, 204, 0.5)', selectable: false })); // Semi-transparent lines
    }
  }, [setCanvas]);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

export default CanvasGrid;
