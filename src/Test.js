import React, { useState } from 'react';
import compromise from 'compromise';

const tableData = [
  { id: 1, name: 'John Doe', age: 25, occupation: 'Developer', joiningDate: '2022-01-01' },
  { id: 2, name: 'Jane Smith', age: 30, occupation: 'Designer', joiningDate: '2022-02-15' },
  // ...more data
];

const FilteredTable = ({ data, filterQuery }) => {
  const doc = compromise(filterQuery);
  const terms = doc.terms().out('array');

  const filteredData = data.filter((row) => {
    return terms.every((term) => {
      // Check for date-specific conditions
      if (term === 'after' || term === 'since') {
        const afterDate = new Date(); // Set default date to today
        return new Date(row.joiningDate) > afterDate;
      } else if (term === 'before' || term === 'prior') {
        const beforeDate = new Date(); // Set default date to today
        return new Date(row.joiningDate) < beforeDate;
      } else if (term === 'between') {
        // Example: "between January 1, 2022, and February 1, 2022"
        const fromDate = new Date('2022-01-01');
        const toDate = new Date('2022-02-01');
        return new Date(row.joiningDate) >= fromDate && new Date(row.joiningDate) <= toDate;
      } else {
        // For non-date terms, check if the term exists in any of the row's values
        return Object.values(row).some((value) => value.toString().toLowerCase().includes(term.toLowerCase()));
      }
    });
  });

  return (
    <table>
      {/* Render your table headers */}
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Age</th>
          <th>Occupation</th>
          <th>Joining Date</th>
        </tr>
      </thead>
      {/* Render your filtered table rows */}
      <tbody>
        {filteredData.map((row) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.age}</td>
            <td>{row.occupation}</td>
            <td>{row.joiningDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const App = () => {
  const [filterQuery, setFilterQuery] = useState('');

  const handleFilterChange = (e) => {
    setFilterQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter NLP Query..."
        value={filterQuery}
        onChange={handleFilterChange}
      />
      <FilteredTable data={tableData} filterQuery={filterQuery} />
    </div>
  );
};

export default App;
