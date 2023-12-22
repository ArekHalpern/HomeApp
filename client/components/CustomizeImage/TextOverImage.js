import React, { useRef, useEffect, useState } from 'react';

const TextOverImage = ({ imageUrl, onSave }) => {
  const canvasRef = useRef(null);
  const [text, setText] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, image.width, image.height);
      setIsLoaded(true);
    };

    image.src = imageUrl;
  }, [imageUrl]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleDrawText = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.font = '30px Arial';
    ctx.fillStyle = 'white';
    ctx.fillText(text, 50, 50); // You can adjust the position and styling
  };

  const handleSave = () => {
    const canvas = canvasRef.current;
    onSave(canvas.toDataURL('image/png'));
  };

  return (
    <div>
      <canvas ref={canvasRef} style={{ border: '1px solid black' }} />
      {isLoaded && (
        <div>
          <input type="text" value={text} onChange={handleTextChange} />
          <button onClick={handleDrawText}>Add Text</button>
          <button onClick={handleSave}>Save Image</button>
        </div>
      )}
    </div>
  );
};

export default TextOverImage;
