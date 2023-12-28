import React from "react";

const ExcalidrawIframeComponent = () => {
    // The URL where your Next.js Excalidraw app is hosted
    const ExcalidrawComponent = 'http://localhost:3001';
  
    return (
      <iframe src={ExcalidrawComponent} style={{ width: '100%', height: '100vh' }} />
    );
  };
  
export default ExcalidrawIframeComponent;