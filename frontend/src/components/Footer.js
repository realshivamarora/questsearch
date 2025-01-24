import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaPhoneAlt, FaWhatsapp, FaEnvelope, FaGlobe } from 'react-icons/fa';

function Footer() {
  const handleCall = () => {
    window.location.href = "tel:+919815366293"; 
  };

  const handleWhatsApp = () => {
    window.location.href = "https://wa.me/+919815366293"; 
  };

  const handleMail = () => {
    window.location.href = "mailto:shivam.arora.contact@gmail.com"; 
  };

  const handleWebsite = () => {
    window.location.href = "https://aroratech.tech"; 
  };

  return (
    <footer className="d-flex justify-content-between align-items-center" style={{ backgroundColor: '#ff4b1f', height: '80px', position: 'fixed', bottom: 0, width: '100%', padding: '0 20px' }}>
      <div className="text-white" style={{ fontWeight: 'bold' }}>
        <p className="m-0">
          Developed with{' '}
          <span style={{ color: 'blue' }}>🤍</span> by{' '}
          <a href="https://aroratech.tech" target="_blank" rel="noopener noreferrer" className="text-white text-decoration-underline">
            Shivam Arora
          </a>
        </p>
      </div>
      
      <div>
        <button onClick={handleCall} style={{ background: 'none', border: 'none', color: 'white', marginRight: '15px' }}>
          <FaPhoneAlt size={25} />
        </button>
        <button onClick={handleWhatsApp} style={{ background: 'none', border: 'none', color: 'white', marginRight: '15px' }}>
          <FaWhatsapp size={25} />
        </button>
        <button onClick={handleMail} style={{ background: 'none', border: 'none', color: 'white', marginRight: '15px' }}>
          <FaEnvelope size={25} />
        </button>
        <button onClick={handleWebsite} style={{ background: 'none', border: 'none', color: 'white' }}>
          <FaGlobe size={25} />
        </button>
      </div>
    </footer>
  );
}

export default Footer;
