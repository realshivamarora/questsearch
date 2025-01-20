import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import QuestionsDisplay from './QuestionsDisplay';
import { fetchQuestionsByCategory } from '../services/api';

function SearchBar() {
  const [category, setCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleSearchByCategory = async () => {
    if (!category) return;
    const response = await fetchQuestionsByCategory(category, currentPage);
    setQuestions(response.questions);
    setTotalPages(response.totalPages);
  };

  const handlePageChange = async (page) => {
    setCurrentPage(page);
    const response = await fetchQuestionsByCategory(category, page);
    setQuestions(response.questions);
  };

  return (
    <div>
      <div style={searchBarContainerStyle} className="container p-4 d-flex justify-content-between">
        {/* Left Side: Search Field */}
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control search-input"
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
          <button style={searchButtonStyle} className="ms-2" onClick={handleSearchByCategory}>
            Search
          </button>
        </div>
      </div>
      {/* Questions Display */}
      {questions.length > 0 && (
        <QuestionsDisplay
          questions={questions}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
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
