import React from 'react';
import { Card, Row, Col, Pagination } from 'react-bootstrap';

function QuestionsDisplay({ questions, currentPage, totalPages, onPageChange }) {
  return (
    <div className="container mt-4">
      <Row>
        {questions.map((question, index) => (
          <Col key={index} xs={12} md={4} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{question.title}</Card.Title>
                <Card.Text>{question.solution || 'No solution available'}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {totalPages > 1 && (
        <Pagination className="justify-content-center">
          {Array.from({ length: totalPages }, (_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </div>
  );
}

export default QuestionsDisplay;
