import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';

const ImageEditor = () => {
  const canvasRef = useRef(null);
  const [brushSize, setBrushSize] = useState(10);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Set initial brush properties for AI inpainting masks
    canvas.freeDrawingBrush.color = 'black';
    canvas.freeDrawingBrush.width = brushSize;

    // Function to update brush size
    const updateBrushSize = () => {
      if (canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush.width = brushSize;
      }
    };

    // Call updateBrushSize initially
    updateBrushSize();

    // Resize canvas on window resize
    const handleResize = () => {
      canvas.setWidth(window.innerWidth);
      canvas.setHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Example function to handle AI inpainting using masks created on the canvas
    // This should be replaced with actual logic to send the mask to the backend and receive the inpainted image
    const handleAIInpainting = () => {
      console.log('Sending mask to backend for AI inpainting...');
      // Logic to send mask to backend and receive inpainted image
    };

    // Add event listener for a custom button or action to trigger AI inpainting
    document.getElementById('aiInpaintButton').addEventListener('click', handleAIInpainting);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.getElementById('aiInpaintButton').removeEventListener('click', handleAIInpainting);
    };
  }, []);

  // Update brush size when brushSize state changes
  useEffect(() => {
    const canvas = canvasRef.current && canvasRef.current.fabric;
    if (canvas && canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.width = brushSize;
    }
  }, [brushSize]);

  return (
    <div>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0 }} />
      <button id="aiInpaintButton" style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>
        AI Inpaint
      </button>
      <input 
        type="range" 
        min="1" 
        max="50" 
        value={brushSize} 
        onChange={(e) => setBrushSize(e.target.value)} 
        style={{ position: 'absolute', top: '50px', right: '10px', zIndex: 1000 }}
      />
    </div>
  );
};

export default ImageEditor;
