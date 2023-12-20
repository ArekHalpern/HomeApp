import React, { useState } from 'react';
import { connect } from 'react-redux';


export const Home = props => {
  const { username } = props;
  const [inputValue, setInputValue] = useState('');
  const [lines, setLines] = useState([]);

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
    <div className="matrix-terminal" tabIndex="0" onKeyDown={handleKeyDown}>
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

