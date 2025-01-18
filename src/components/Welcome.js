import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Welcome() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: 'calc(100vh - 160px)', backgroundColor: 'white' }}>
      <h1 className="text-center" style={{ fontSize: '4rem', fontStyle: 'italic', color: '#ff4b1f' }}>Welcome</h1>
      <h2 className="text-center" style={{ fontSize: '2rem', color: '#ff4b1f' }}>to</h2>
      <h3 className="text-center" style={{ fontSize: '3rem', fontWeight: 'bold', fontStyle: 'italic', color: '#ff4b1f' }}>QuestSearch</h3>
    </div>
  );
}

export default Welcome;
