import React, {  } from 'react';

const Logger: React.FC<{ logs: string[] }> = ({ logs }) => {
  return (
    <div className="logger">
      <h3>Logs</h3>
      <div className="logs">
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
};

export default Logger;
