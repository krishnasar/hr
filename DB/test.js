import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  padding: 12px;
  background-color: #2c3e50;
  color: white;
  cursor: pointer;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
`;

const Input = styled.input`
  padding: 6px;
  margin: 10px 0;
  width: 200px;
`;

const Pagination = styled.div`
  margin-top: 10px;
  button {
    margin: 0 4px;
    padding: 6px 10px;
    background: #2c3e50;
    color: white;
    border: none;
    cursor: pointer;
  }
`;

function CountryReport() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sortKey, setSortKey] = useState('country_id');
  const [sortAsc, setSortAsc] = useState(true);
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSize = 5;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://your-api-url.com/countries'); // ✅ Replace with actual API URL
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setCountries(data);
        setFiltered(data);
        setError(null);
      } catch (err) {
        setError(`Failed to fetch data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const result = countries
      .filter(c =>
        c.country_name.toLowerCase().includes(filter.toLowerCase()) ||
        c.country_id.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1;
        return 0;
      });
    setFiltered(result);
    setPage(1);
  }, [filter, sortKey, sortAsc, countries]);

  const handleSort = key => {
    if (key === sortKey) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const pagedData = filtered.slice((page - 1) * pageSize, page * pageSize);
  const totalPages = Math.ceil(filtered.length / pageSize);

  return (
    <div>
      <h2>Country Report</h2>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <>
          <Input
            type="text"
            placeholder="Search by ID or Name"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
          <Table>
            <thead>
              <tr>
                <Th onClick={() => handleSort('country_id')}>Country ID</Th>
                <Th onClick={() => handleSort('country_name')}>Country Name</Th>
                <Th onClick={() => handleSort('region_id')}>Region ID</Th>
              </tr>
            </thead>
            <tbody>
              {pagedData.map(country => (
                <tr key={country.country_id}>
                  <Td>{country.country_id}</Td>
                  <Td>{country.country_name}</Td>
                  <Td>{country.region_id}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            {Array.from({ length: totalPages }, (_, i) => (
              <button key={i + 1} onClick={() => setPage(i + 1)}>
                {i + 1}
              </button>
            ))}
          </Pagination>
        </>
      )}
    </div>
  );
}

export default CountryReport;
