import React, { useState } from 'react';



export const SampleSortableTable = () => {
  const [data, setData] = useState([
    { id: 1, name: 'John', age: 25 },
    { id: 2, name: 'Jane', age: 30 },
    { id: 3, name: 'Doe', age: 22 },
  ]);

  const [sortedData, setSortedData] = useState(data);

  const handleSort = (key) => {
    const sorted = [...data].sort((a, b) => a[key] > b[key] ? 1 : -1);
    setSortedData(sorted);
  };

  return (
    <div>
      <h1>Sortable Table</h1>
      <button onClick={() => handleSort('name')}>Sort by Name</button>
      <button onClick={() => handleSort('age')}>Sort by Age</button>
      
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// export default SampleSortableTable;
