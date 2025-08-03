import React, { useState } from 'react';
import { Button, Form, Alert, Spinner } from 'react-bootstrap';
import { uploadCsvFile } from '../services/api';

const FileUpload = ({ onUploadResult }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setError('');
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select a CSV file to upload');
      return;
    }

    if (!selectedFile.name.toLowerCase().endsWith('.csv')) {
      setError('Please select a CSV file');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await uploadCsvFile(selectedFile);
      onUploadResult(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setError('');
    onUploadResult(null);
    // Reset file input
    document.getElementById('csvFileInput').value = '';
  };

  return (
    <div>
      <h2 className="mb-4">CSV File Validator</h2>
      <p className="text-muted mb-4">
        Upload a CSV file with Name and DateOfBirth columns to validate the data format.
      </p>
      
      <Form.Group className="mb-3">
        <Form.Label>Select CSV File</Form.Label>
        <Form.Control
          id="csvFileInput"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          disabled={loading}
        />
      </Form.Group>

      {error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}

      <div className="d-flex gap-2">
        <Button
          variant="primary"
          onClick={handleUpload}
          disabled={!selectedFile || loading}
        >
          {loading ? (
            <>
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Validating...
            </>
          ) : (
            'Upload & Validate'
          )}
        </Button>

        <Button
          variant="secondary"
          onClick={handleReset}
          disabled={loading}
        >
          Reset
        </Button>
      </div>

      {selectedFile && (
        <div className="mt-3">
          <small className="text-muted">
            Selected file: {selectedFile.name} ({(selectedFile.size / 1024).toFixed(2)} KB)
          </small>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
