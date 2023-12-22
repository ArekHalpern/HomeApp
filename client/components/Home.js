import React, { useState } from 'react';
import { connect } from 'react-redux';
// import BackgroundManager from './backgroundManager';
// import CanvasPreview from './CanvasPreview';

export const Home = props => {
  const { username } = props;
  const [inputValue, setInputValue] = useState('');
  const [lines, setLines] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState('');

  const handleIconClick = (imageUrl) => {
    setBackgroundImage(imageUrl);
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (inputValue.toLowerCase() === 'clear') {
        setLines([]);
      } else {
        setLines([...lines, inputValue]);
      }
      setInputValue('');
    } else if (event.key === 'Backspace') {
      setInputValue(inputValue.slice(0, -1));
    } else {
      setInputValue(inputValue + event.key);
    }
  };

  return (
    <div className="matrix-terminal" style={backgroundStyle} tabIndex="0" onKeyDown={handleKeyDown}>
      {/* <BackgroundManager setBackgroundImage={setBackgroundImage} /> */}
      <h3>Welcome back, {username}. What are we designing today?</h3>
      <div className="terminal-output">
        {lines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
        <p>{inputValue}</p>
      </div>
    </div>
  );
};

const mapState = state => {
  return {
    username: state.auth.username,
  };
};

export default connect(mapState)(Home);

