import React from 'react';

const Logger: React.FC<{ logs: string[] }> = ({ logs }) => {
  return (
    <div className="logger">
      <h3>Logs</h3>
      <div className="logs" style={{ maxHeight: '200px', overflow: 'auto' }}>
        {logs.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </div>
    </div>
  );
};

export default Logger;
