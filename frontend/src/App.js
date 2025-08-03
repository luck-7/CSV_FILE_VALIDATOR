import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FileUpload from './components/FileUpload';
import ErrorDisplay from './components/ErrorDisplay';

function App() {
  const [validationResult, setValidationResult] = useState(null);

  const handleUploadResult = (result) => {
    setValidationResult(result);
  };

  return (
    <div className="App">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <div className="upload-container">
              <FileUpload onUploadResult={handleUploadResult} />
              <ErrorDisplay validationResult={validationResult} />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
