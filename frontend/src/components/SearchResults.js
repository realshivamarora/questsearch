import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';

function SearchResults({ results }) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [anagramSelections, setAnagramSelections] = useState({});

  // Handle MCQ option click
  const handleOptionClick = (questionId, selectedOption) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [questionId]: selectedOption,
    }));
  };

  // Handle Anagram block click
  const handleAnagramClick = (questionId, blockIndex) => {
    setAnagramSelections(prevState => {
      const currentSelection = prevState[questionId] || [];
      const newSelection = [...currentSelection, blockIndex];
      return { ...prevState, [questionId]: newSelection };
    });
  };

  // Reset Anagram selections
  const resetAnagram = questionId => {
    setAnagramSelections(prevState => ({
      ...prevState,
      [questionId]: [],
    }));
  };

  // Check if the Anagram solution is correct
  const checkAnagramSolution = (questionId) => {
    const selections = anagramSelections[questionId] || [];
    const question = results.find(q => q._id === questionId);
    if (!question) return false;

    // If it's a word anagram, do not add spaces between the selected blocks
    if (question.type === 'ANAGRAM' && question.anagramType === 'WORD') {
      const selectedText = selections
        .map(index => question.blocks[index].text)
        .join(''); // No space for word anagram
      return selectedText === question.solution;
    }

    // If it's a sentence anagram, add spaces between the selected blocks
    const selectedText = selections
      .map(index => question.blocks[index].text)
      .join(' ') // Add space for sentence anagram
      .trim(); // Trim the final result to avoid extra spaces at the end

    return selectedText === question.solution;
  };

  const getOptionStyle = (option, questionId) => {
    const selectedAnswer = selectedOptions[questionId];
    if (selectedAnswer) {
      if (option.isCorrectAnswer && selectedAnswer.text === option.text) {
        return { backgroundColor: 'green', color: 'white' };
      }
      if (!option.isCorrectAnswer && selectedAnswer.text === option.text) {
        return { backgroundColor: 'red', color: 'white' };
      }
    }
    return { backgroundColor: '#ff4b1f', color: 'white' }; // Default background color
  };

  if (results.length === 0) {
    return <div>No results found</div>;
  }

  return (
    <div className="container mt-4">
      <Row>
        {results.map((question, index) => (
          <Col key={question._id} xs={12} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>
                  <strong>Question {index + 1}: </strong>
                  {question.title}
                </Card.Title>

                {/* Displaying Anagram Blocks */}
                {question.type === 'ANAGRAM' && question.blocks && (
                  <div className="mt-3">
                    <strong>Blocks:</strong>
                    <div>
                      {question.blocks.map((block, idx) => (
                        <Button
                          key={block._id || idx}
                          className="p-2 m-1 border rounded"
                          style={{
                            backgroundColor: anagramSelections[question._id]?.includes(idx)
                              ? '#d3d3d3'
                              : '#007bff',
                            color: 'white',
                            display: block.showInOption ? 'inline-block' : 'none',
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
                        ?.map(index => question.blocks[index].text)
                        .join(' ')} {/* Join with space between words */}
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

                {/* Displaying MCQ options */}
                {question.type === 'MCQ' && question.options && (
                  <div>
                    {question.options.map((option, idx) => (
                      <Button
                        key={idx}
                        style={getOptionStyle(option, question._id)}
                        onClick={() => handleOptionClick(question._id, option)}
                        className="mb-2 w-100"
                      >
                        {option.text}
                      </Button>
                    ))}
                  </div>
                )}

                {/* Displaying Read Along */}
                {question.type === 'READ_ALONG' && (
                  <div>
                    <strong>Read Along Text:</strong>
                    <p>{question.solution}</p>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default SearchResults;
