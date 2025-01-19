import React, { useState } from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import { searchQuestions } from '../api';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState(1);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const result = await searchQuestions(searchTerm, category, page);
      setQuestions(result);
    } catch (err) {
      console.error('Error fetching questions:', err);
    }
  };

  return (
    <div className="container p-4 d-flex justify-content-between" style={{ backgroundColor: 'white', borderBottom: '1px solid #ccc', height: '80px' }}>
      <div className="d-flex align-items-center">
        <input
          type="text"
          className="form-control search-input"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for questions..."
        />
        <button
          style={{ backgroundColor: '#ff4b1f', color: 'white', border: 'none', padding: '6px 15px', cursor: 'pointer', borderRadius: '5px' }}
          className="ms-2"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>

      <div className="d-flex align-items-center">
        <span style={{ color: '#888', marginRight: '10px' }}>OR Search by Category</span>
        <Dropdown>
          <Dropdown.Toggle variant="outline-secondary" id="dropdown-category" style={{ borderColor: '#ccc', padding: '6px 15px', backgroundColor: 'white' }}>
            {category || 'Select Category'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => setCategory('MCQs')}>MCQs</Dropdown.Item>
            <Dropdown.Item onClick={() => setCategory('Anagrams')}>Anagrams</Dropdown.Item>
            <Dropdown.Item onClick={() => setCategory('Read Along')}>Read Along</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <button
          style={{ backgroundColor: '#ff4b1f', color: 'white', border: 'none', padding: '6px 15px', cursor: 'pointer', borderRadius: '5px' }}
          className="ms-2"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>

      {/* Render Questions List Below */}
      <div className="row mt-4">
        {questions.map((question) => (
          <div className="col-md-12" key={question.questionId}>
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{question.questionText}</h5>
                <p className="card-text">{question.category}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <Button
          variant="outline-secondary"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </Button>
        <Button
          variant="outline-secondary"
          className="ms-3"
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default SearchBar;
