import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState(''); 

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.append('query', searchTerm);
      if (category) queryParams.append('category', category);

      const response = await axios.get(`http://localhost:5000/api/search?${queryParams.toString()}`);
      onSearch(response.data); 
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat); 
  };

  const getButtonStyle = (cat) => {
    return cat === category
      ? { backgroundColor: '#ff4b1f', color: 'white', border: 'none' } 
      : { backgroundColor: 'white', color: '#888', border: '1px solid #ccc' };
  };

  return (
    <div style={searchBarContainerStyle} className="container p-4 d-flex justify-content-between">
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

      <div className="d-flex align-items-center">
        <Button onClick={() => handleCategoryChange('MCQ')} style={getButtonStyle('MCQ')} className="ms-2">MCQs</Button>
        <Button onClick={() => handleCategoryChange('ANAGRAM')} style={getButtonStyle('ANAGRAM')} className="ms-2">Anagrams</Button>
        <Button onClick={() => handleCategoryChange('READ_ALONG')} style={getButtonStyle('READ_ALONG')} className="ms-2">Read Along</Button>
        <Button onClick={() => handleCategoryChange('CONTENT_ONLY')} style={getButtonStyle('CONTENT_ONLY')} className="ms-2">Content Only</Button>
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

export default SearchBar;
