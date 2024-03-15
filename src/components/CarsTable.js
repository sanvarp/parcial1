import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CarsTable.css'; 

const CarsTable = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/cars')
      .then((response) => {
        setCars(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading data!</p>;

  return (
    <table style={{ width: '850px', height: '400px' }}>
      <thead>
        <tr>
          <th>#</th>
          <th>Marca</th>
          <th>Línea</th>
          <th>Modelo</th>
        </tr>
      </thead>
      <tbody>
        {cars.map((car, index) => (
          <tr key={car.id}>
            <td>{index + 1}</td>
            <td>{car.marca}</td>
            <td>{car.linea}</td>
            <td>{car.modelo}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CarsTable;
