import React, { useState, useEffect } from 'react';

function Welcome() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to CHARUSAT!!!!</h1>
      <h2>It is {date.toLocaleDateString()}</h2>
      <h2>It is {date.toLocaleTimeString()}</h2>
    </div>
  );
}

export default Welcome;
