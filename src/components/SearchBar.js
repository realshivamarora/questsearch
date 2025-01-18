import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
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
        <button style={searchButtonStyle} className="ms-2">Search</button>
      </div>

      {/* Right Side: Category Dropdown */}
      <div className="d-flex align-items-center">
        <span style={orTextStyle}>OR Search by Category</span>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-category" style={dropdownButtonStyle}>
            {category || 'Select Category'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setCategory('MCQs')}>MCQs</Dropdown.Item>
            <Dropdown.Item onClick={() => setCategory('Anagrams')}>Anagrams</Dropdown.Item>
            <Dropdown.Item onClick={() => setCategory('Read Along')}>Read Along</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <button style={searchButtonStyle} className="ms-2">Search</button>
      </div>
    </div>
  );
}

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

const orTextStyle = {
  color: '#888',
  marginRight: '10px',
};

const dropdownButtonStyle = {
  borderColor: '#ccc',
  padding: '6px 15px',
  backgroundColor: 'white',
};

export default SearchBar;
