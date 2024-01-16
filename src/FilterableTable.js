import React, { useState, useEffect } from 'react';
import { Table, Form, FormControl } from 'react-bootstrap';
import compromise from 'compromise';

const data = [
  { id: 1, name: 'John Doe', age: 25, dob: '1999-05-15' },
  { id: 2, name: 'Jane Smith', age: 30, dob: '1992-08-20' },
  { id: 3, name: 'Bob Johnson', age: 28, dob: '1994-03-10' },
  // Add more data as needed
];

const FilterableTable = () => {
  const [filter, setFilter] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    // Process natural language input using compromise
    const nlpResult = compromise(filter);

    // Extract individual words from the input
    const words = nlpResult.terms().out('array');

    // Update filtering logic based on the extracted words
    handleUserInput(words);
  }, [filter]);

  const handleUserInput = (words) => {
    // Update your filtering logic based on the extracted words
    // This is a placeholder; you need to adapt it based on your specific use case
    const filteredResult = data.filter(item => {
      // Check if any word matches the name, date of birth, or age
      const match = words.some(word =>
        item.name.toLowerCase().includes(word.toLowerCase()) ||
        item.dob.includes(word) ||
        item.age.toString().includes(word)
      );

      // Additional logic: Extract age condition from the input and apply
      if (match) {
        const ageCondition = words.find(word => word === 'less' || word === 'more');
        if (ageCondition) {
          const comparison = ageCondition === 'less' ? '<' : '>';
          const ageValue = parseInt(words.find(word => !isNaN(word)), 10);

          return comparison === '<' ? item.age < ageValue : item.age > ageValue;
        }
      }

      return match;
    });

    setFilteredData(filteredResult);
  };

  return (
    <div>
      <Form className="mb-3">
        <FormControl
          type="text"
          placeholder="Filter by natural language input"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Date of Birth</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.dob}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default FilterableTable;
