import React from 'react';
import { Table, Alert, Badge } from 'react-bootstrap';

const ErrorDisplay = ({ validationResult }) => {
  if (!validationResult) {
    return null;
  }

  const { status, errors } = validationResult;

  if (status === 'success') {
    return (
      <Alert variant="success" className="mt-4">
        <Alert.Heading>✅ Validation Successful!</Alert.Heading>
        <p className="mb-0">
          All rows in your CSV file are valid. No errors found.
        </p>
      </Alert>
    );
  }

  if (status === 'error' && errors && errors.length > 0) {
    return (
      <div className="mt-4">
        <Alert variant="danger">
          <Alert.Heading>❌ Validation Failed</Alert.Heading>
          <p className="mb-0">
            Found <Badge bg="danger">{errors.length}</Badge> error(s) in your CSV file:
          </p>
        </Alert>

        <Table striped bordered hover responsive className="mt-3">
          <thead className="table-dark">
            <tr>
              <th style={{ width: '100px' }}>Row #</th>
              <th>Error Message</th>
            </tr>
          </thead>
          <tbody>
            {errors.map((error, index) => (
              <tr key={index}>
                <td className="text-center">
                  <Badge bg="danger">{error.row}</Badge>
                </td>
                <td>{error.message}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="mt-3">
          <small className="text-muted">
            <strong>Expected format:</strong>
            <ul className="mt-2">
              <li>Name: Must not be empty</li>
              <li>DateOfBirth: Must be in yyyy-MM-dd format (e.g., 1990-05-15)</li>
            </ul>
          </small>
        </div>
      </div>
    );
  }

  return null;
};

export default ErrorDisplay;
