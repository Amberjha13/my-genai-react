// SentimentAnalysis.js
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import nlp from 'compromise';

const SentimentAnalysis = () => {
  const [inputText, setInputText] = useState('');
  const [sentimentResult, setSentimentResult] = useState(null);

  const analyzeSentiment = () => {
    const doc = nlp(inputText);
    doc.verbs().toPastTense()
    const sentiment = doc.text()
    // const sentiment = doc.sentiment();
    setSentimentResult(sentiment);
  };

  return (
    <Container>
      <h1>Sentiment Analysis</h1>
      <Form>
        <Form.Group controlId="textArea">
          <Form.Label>Enter Text:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={analyzeSentiment}>
          Analyze
        </Button>
      </Form>

      {sentimentResult && (
        <Alert variant={sentimentResult > 0 ? 'success' : sentimentResult < 0 ? 'danger' : 'info'}>
          {sentimentResult > 0
            ? 'Positive Sentiment'
            : sentimentResult < 0
            ? 'Negative Sentiment'
            : 'Neutral Sentiment'}
        </Alert>
      )}
    </Container>
  );
};

export default SentimentAnalysis;
