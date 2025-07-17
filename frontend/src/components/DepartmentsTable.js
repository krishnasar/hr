import React, { useState } from 'react';
import { departmentsData } from '../data/data';
import { tableStyles } from '../styles/styles';
import { exportToCSV, exportToExcel, exportToPDF, exportToDOCX } from '../utils/exportUtils';

function DepartmentsTable() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const filtered = departmentsData.filter(d =>
    Object.values(d).some(val =>
      String(val).toLowerCase().includes(search.toLowerCase())
    )
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortBy) return 0;
    return String(a[sortBy]).localeCompare(String(b[sortBy]));
  });

  const paginated = sorted.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
  const totalPages = Math.ceil(sorted.length / rowsPerPage);
  const columns = Object.keys(departmentsData[0]);

  return (
    <div style={tableStyles.container}>
      <h2>Departments Table</h2>
      <input
        style={tableStyles.search}
        type="text"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div>
        <button style={tableStyles.exportBtn} onClick={() => exportToExcel(sorted, 'departments')}>Excel</button>
        <button style={tableStyles.exportBtn} onClick={() => exportToCSV(sorted, 'departments')}>CSV</button>
        <button style={tableStyles.exportBtn} onClick={() => exportToPDF(sorted, columns, 'departments')}>PDF</button>
        <button style={tableStyles.exportBtn} onClick={() => exportToDOCX(sorted, columns, 'departments')}>DOCX</button>
      </div>
      <table style={tableStyles.table}>
        <thead>
          <tr>
            {columns.map(col => (
              <th key={col} style={tableStyles.th} onClick={() => setSortBy(col)}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginated.map((row, i) => (
            <tr key={i}>
              {columns.map(col => (
                <td key={col} style={tableStyles.td}>{row[col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={tableStyles.pagination}>
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}>Prev</button>
        <span>Page {currentPage} / {totalPages}</span>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}>Next</button>
      </div>
    </div>
  );
}

export default DepartmentsTable;
