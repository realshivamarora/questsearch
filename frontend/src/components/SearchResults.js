import React, { useState, useEffect } from 'react';
import './SearchResults.css';
import { Card, Row, Col, Button, Pagination } from 'react-bootstrap';

function SearchResults({ results }) {
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;

  const [selectedOptions, setSelectedOptions] = useState({});
  const [anagramSelections, setAnagramSelections] = useState({});
  const [shuffledBlocks, setShuffledBlocks] = useState({});

  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  useEffect(() => {
    const initialShuffledBlocks = {};
    results.forEach((question) => {
      if (question.type === 'ANAGRAM' && question.blocks) {
        initialShuffledBlocks[question._id] = shuffleArray(question.blocks);
      }
    });
    setShuffledBlocks(initialShuffledBlocks);
  }, [results]);

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const handleOptionClick = (questionId, selectedOption) => {
    setSelectedOptions((prevState) => ({
      ...prevState,
      [questionId]: selectedOption,
    }));
  };

  const handleAnagramClick = (questionId, blockIndex) => {
    setAnagramSelections((prevState) => {
      const currentSelection = prevState[questionId] || [];
      const newSelection = [...currentSelection, blockIndex];
      return { ...prevState, [questionId]: newSelection };
    });
  };

  const resetAnagram = (questionId) => {
    setAnagramSelections((prevState) => ({
      ...prevState,
      [questionId]: [],
    }));
  };

  const resetMCQ = (questionId) => {
    setSelectedOptions((prevState) => {
      const updatedState = { ...prevState };
      delete updatedState[questionId];
      return updatedState;
    });
  };

  const checkAnagramSolution = (questionId) => {
    const selections = anagramSelections[questionId] || [];
    const question = results.find((q) => q._id === questionId);
    if (!question) return false;

    const selectedText = selections
      .map((index) => shuffledBlocks[questionId][index].text)
      .join(question.anagramType === 'WORD' ? '' : ' ')
      .trim();

    return selectedText === question.solution;
  };

  const getOptionStyle = (option, questionId) => {
    const selectedAnswer = selectedOptions[questionId];
    if (selectedAnswer) {
      if (option.isCorrectAnswer && selectedAnswer.text === option.text) {
        return {
          backgroundColor: '#28a745', 
          color: 'white',
          transition: 'all 0.3s ease',
          height: '50px'
        };
      }
      if (!option.isCorrectAnswer && selectedAnswer.text === option.text) {
        return {
          backgroundColor: '#dc3545', 
          color: 'white',
          transition: 'all 0.3s ease',
          height: '50px'
        };
      }
      return {
        color: 'grey', 
        backgroundColor: 'white',
        border: '1px solid grey',
        transition: 'all 0.3s ease',
        height: '50px'
      };
    }
    return {
      color: 'black', 
      backgroundColor: 'white',
      border: '1px solid grey',
      fontWeight: 'bold',
      height: '50px', 
    };
  };

  const totalPages = Math.ceil(results.length / questionsPerPage);
  const paginatedResults = results.slice(
    (currentPage - 1) * questionsPerPage,
    currentPage * questionsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (results.length === 0) {
    return (
      <div style={{ textAlign: 'center', color: '#ff4b1f', fontStyle: 'italic' }}>
        <p>Oops! No Question Found.</p>
        <p style={{ fontSize: 'smaller' }}>Maybe try some other keyword</p>
      </div>
    );
  }

  return (
    <div className="container mt-4" style={{ paddingBottom: '100px', marginBottom: '100px'}}>
      <Row>
        {paginatedResults.map((question, index) => (
          <Col key={question._id} xs={12} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>
                  <strong>Question {index + 1 + (currentPage - 1) * questionsPerPage}: </strong>
                  {question.title}
                </Card.Title>

                {question.type === 'READ_ALONG' || question.type === 'CONTENT_ONLY' ? (
                  <div>
                    <p>{question.title}</p>
                    <Button variant="primary" style={{ backgroundColor: '#ff4b1f', border: 'none' }} onClick={() => speakText(question.title)}>
                      🔊 Speak
                    </Button>
                  </div>
                ) : (
                  <>
                    {question.type === 'ANAGRAM' && question.blocks && (
                      <div className="mt-3">
                        <strong>Blocks:</strong>
                        <div>
                          {(shuffledBlocks[question._id] || []).map((block, idx) => (
                            <Button
                              key={block._id || idx}
                              className="p-2 m-1 border rounded"
                              style={{
                                backgroundColor: anagramSelections[question._id]?.includes(idx)
                                  ? '#d3d3d3'
                                  : '#ff4b1f',
                                color: 'white',
                              }}
                              disabled={anagramSelections[question._id]?.includes(idx)}
                              onClick={() => handleAnagramClick(question._id, idx)}
                            >
                              {block.text}
                            </Button>
                          ))}
                        </div>
                        <div className="mt-2">
                          <strong>Selected Order:</strong>{' '}
                          {anagramSelections[question._id]
                            ?.map((index) => shuffledBlocks[question._id][index].text)
                            .join(' ')}
                          <br />
                          <strong>Result:</strong>{' '}
                          {anagramSelections[question._id]?.length === question.blocks.length
                            ? checkAnagramSolution(question._id)
                              ? 'Correct'
                              : 'Wrong'
                            : 'Incomplete'}
                        </div>
                        <Button
                          variant="danger"
                          className="mt-2"
                          onClick={() => resetAnagram(question._id)}
                        >
                          Reset
                        </Button>
                      </div>
                    )}

                    {question.type === 'MCQ' && question.options && (
                      <div>
                      {question.options.map((option, idx) => (
                        <Button
                          key={idx}
                          style={{
                            ...getOptionStyle(option, question._id),
                            height: '50px', // Increased height for buttons
                          }}
                          onClick={() => handleOptionClick(question._id, option)}
                          className="mb-2 w-100"
                        >
                          {option.text}
                        </Button>
                      ))}
                      <Button
                        variant="danger"
                        className="mt-2 w-100"
                        onClick={() => resetMCQ(question._id)}
                      >
                        Reset Selection
                      </Button>
                    </div>
                    )}
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

<Pagination className="justify-content-center mt-4 custom-pagination">
  {[...Array(totalPages)].map((_, pageIndex) => (
    <Pagination.Item
      key={pageIndex}
      active={pageIndex + 1 === currentPage}
      onClick={() => handlePageChange(pageIndex + 1)}
    >
      {pageIndex + 1}
    </Pagination.Item>
  ))}
</Pagination>
    </div>
  );
}

export default SearchResults;
