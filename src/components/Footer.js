import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <footer className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#ff4b1f', height: '80px' }}>
      <p className="text-white text-center" style={{ fontWeight: 'bold' }}>
        Developed with{' '}
        <span style={{ color: 'blue' }}>🤍</span> by{' '}
        <a href="https://aroratech.tech" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-underline">
          Shivam Arora
        </a>
      </p>
    </footer>
  );
}

export default Footer;
