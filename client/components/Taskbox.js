import React, { useState } from 'react';

const Taskbox = () => {
  // State for tasks could be added here if dynamic functionality is needed
  const [tasks, setTasks] = useState([
    { time: '5:00', activity: 'Wake-Up' },
    { time: '6:00', activity: 'Breakfast' },
    // ...other tasks
  ]);

  return (
    <div className="taskbox">
      <div className="header">
        <h2>The Time Box</h2>
        <div>Date: <span className="date">12.3.21 Friday</span></div>
      </div>
      <div className="content">
        <div className="priorities">
          <h3>Top Priorities</h3>
          <ul>
            <li>Develop new app feature</li>
            <li>Publish Article</li>
            <li>Read course material</li>
          </ul>
          <h3>Brain Dump</h3>
          <ul>
            <li>Web App</li>
            <li>Meetings & Calls</li>
            {/* More items can be added here */}
          </ul>
        </div>
        <div className="schedule">
          {/* Map over tasks state to render the schedule dynamically */}
          {tasks.map((task, index) => (
            <div key={index} className="task">
              <span className="task-time">{task.time}</span>
              <span className="task-activity">{task.activity}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Taskbox;
