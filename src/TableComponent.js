import React, { useState, useEffect } from 'react';
import { Table, Form, FormControl, Button } from 'react-bootstrap';
import compromise from 'compromise';



const rowdata = [
    { id: 1, name: 'John Doe', age: 25, doj: '2022-05-15' },
    { id: 2, name: 'Jane Smith', age: 30, doj: '2018-08-20' },
    { id: 3, name: 'Bob Johnson', age: 28, doj: '2021-03-10' },
    { id: 4, name: 'Bob Johnson', age: 25, doj: '2022-03-10' },
    { id: 5, name: 'Bob Johnson', age: 24, doj: '2022-06-10' },
    { id: 6, name: 'Bob Johnson', age: 23, doj: '2021-03-10' },
    { id: 7, name: 'Bob Johnson', age: 22, doj: '2000-04-10' },
    { id: 8, name: 'Bob Johnson', age: 21, doj: '2001-03-10' },
    { id: 9, name: 'Bob Johnson', age: 23, doj: '2021-03-10' },
    { id: 10, name: 'Bob Johnson', age: 24, doj: '2021-03-10' },
    { id: 11, name: 'Bob Johnson', age: 26, doj: '2021-08-10' },
    { id: 12, name: 'Bob Johnson', age: 33, doj: '2021-05-10' },
    { id: 13, name: 'Bob Johnson', age: 28, doj: '2021-06-10' },
    { id: 14, name: 'Bob Johnson', age: 35, doj: '2021-05-10' }
    // Add more data as needed
  ];

  const TableComponent = ()=>{
    const [filter, setFilter] = useState('');
    const [data, setRowData]= useState(rowdata); 
    const processText = () => {
        // Set filtered data initially as all nouns
        const doc = compromise(filter.toLowerCase());
        const terms = doc.terms().out('array');
        const filteredData = data.filter((row)=>{
          return terms.every((term) => {
            // Check for date-specific conditions
            if (term === 'after' || term === 'since') {
              const afterDateTerm = term === 'after'?
              doc.match(`after #Date`).out('array'): 
              doc.match(`since #Date`).out('array');
              if (afterDateTerm.length > 0) {
              const afterDate = new Date(afterDateTerm[0])
              return new Date(row.doj) > afterDate;
              }
            } else if (term === 'before' || term === 'prior') {
              const beforeDateTerm = term === 'before'?
              doc.match(`before #Date`).out('array'): 
              doc.match(`prior #Date`).out('array');
              if (beforeDateTerm.length > 0) {
              const beforeDate = new Date(beforeDateTerm[0])
              return new Date(row.doj) < beforeDate;
              }
            }/* else {
              // return Object.values(row).some((value) => value.toString().toLowerCase().includes(term.toLowerCase()));
            } */
            return true;
          });
        });
        filter?setRowData(filteredData):
        setRowData(rowdata);
      };
    return(
        <Form className="mb-3">
         <FormControl
          type="text"
          placeholder="Filter by natural language input"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
         <Button variant="primary" onClick={processText}>
          Process Text
        </Button>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Date of Joining</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.doj}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </Form>
    );
  };
  export default TableComponent;