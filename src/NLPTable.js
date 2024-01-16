// NLPTable.js
import React, { useState } from 'react';
import { Container, Table, Form, Button } from 'react-bootstrap';
import nlp from 'compromise';

const NLPTable = () => {
  const [inputText, setInputText] = useState('');
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [query, setQuery] = useState('');

  const processText = () => {
    const doc = nlp(inputText);
    const nouns = doc.nouns().out('array');
    setTableData(nouns);
    setFilteredData(nouns); // Set filtered data initially as all nouns
  };

  const applyFilter = () => {
    const parsedQuery = nlp(query);
    const intent = parsedQuery.match('#Intent').out('array')[0];

    switch (intent) {
      case 'showTop':
        showTop(parsedQuery);
        break;
      case 'filterByType':
        filterByType(parsedQuery);
        break;
      // Add more cases for other intents as needed
      default:
        setFilteredData(tableData); // Reset to show all entities if no specific intent is matched
    }
  };

  const showTop = (parsedQuery) => {
    const count = parsedQuery.values().toNumber().out('array')[0];
    const topNouns = filteredData.slice(0, count);
    console.log(`Showing top ${count} nouns:`, topNouns);
    // You can use the topNouns data as needed (e.g., display it in another component).
  };

  const filterByType = (parsedQuery) => {
    const entityType = parsedQuery.match('#Type').out('array')[0];
    const filteredNouns = tableData.filter((noun) => noun.toLowerCase() === entityType);
    setFilteredData(filteredNouns);
  };

  return (
    <Container>
      <h1>NLP-based Table</h1>
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
        <Button variant="primary" onClick={processText}>
          Process Text
        </Button>
      </Form>

      <Form className="mt-3">
        <Form.Group controlId="filterQuery">
          <Form.Label>Filter Entities:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter a natural language query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </Form.Group>
        <Button variant="info" onClick={applyFilter}>
          Apply Filter
        </Button>
      </Form>

      {filteredData.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Noun</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((noun, index) => (
              <tr key={index}>
                <td>{noun}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default NLPTable;
