import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import styles from './SearchBar.css';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/search?query=${searchTerm}`);
      onSearch(response.data); // Send results to App.js
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div style={searchBarContainerStyle} className="container p-4 d-flex justify-content-between">
      {/* Left Side: Search Field */}
      <div className="d-flex align-items-center">
        <input
          type="text"
          className="form-control search-input"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for questions..."
        />
        <Button onClick={handleSearchClick} style={searchButtonStyle} className="ms-2">Search</Button>
      </div>

      {/* Right Side: Category Buttons */}
      <div className="d-flex align-items-center">
        <Button style={categoryButtonStyle} className="ms-2">MCQs</Button>
        <Button style={categoryButtonStyle} className="ms-2">Anagrams</Button>
        <Button style={categoryButtonStyle} className="ms-2">Read Along</Button>
      </div>
    </div>
  );
}

// Styles for the components
const searchBarContainerStyle = {
  backgroundColor: 'white',
  borderBottom: '1px solid #ccc',
  height: '80px',
};

const searchButtonStyle = {
  backgroundColor: '#ff4b1f',
  color: 'white',
  border: 'none',
  padding: '6px 15px',
  cursor: 'pointer',
  borderRadius: '5px',
};

const categoryButtonStyle = {
  backgroundColor: 'white',
  color: '#888',
  border: '1px solid #ccc',
  padding: '6px 15px',
  cursor: 'pointer',
  borderRadius: '5px',
};

export default SearchBar;
