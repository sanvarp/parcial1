import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CarsTable.css';
import { useIntl } from 'react-intl';

const CarDetails = ({ car }) => {
  const intl = useIntl(); 

  if (!car) return null;

  return (
    <div className="car-details">
      <h2>{car.marca} {car.linea}</h2>
      <img src={car.imagen} alt={intl.formatMessage({ id: 'carDetails.alt' })} />
      <div className="car-specs">
        <p>{intl.formatMessage({ id: 'carDetails.mileage' })}: {intl.formatNumber(car.kilometraje)}</p>
        <p>{intl.formatMessage({ id: 'carDetails.color' })}: {intl.formatMessage({ id: getColor(car.color) })}</p>
        <p>{intl.formatMessage({ id: 'carDetails.reference' })}: {car.referencia}</p>
      </div>
    </div>
  );
};
const getColor = (color) => {
  switch (color.toLowerCase()) {
    case 'rojo':
    case 'red':
      return 'color.red';
    case 'plata':
    case 'silver':
      return 'color.silver';
    case 'blanco':
    case 'white':
      return 'color.white';
    default:
      return '';
  }
};
const CarsTable = () => {
  const [cars, setCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const intl = useIntl(); 

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

  const handleRowClick = (carId) => {
    axios.get(`http://localhost:3001/cars/${carId}`)
      .then((response) => {
        setSelectedCar(response.data);
      })
      .catch((error) => {
        console.error("Error fetching car details:", error);
        setSelectedCar(null);
      });
  };

  if (loading) return <p>{intl.formatMessage({ id: 'carsTable.loading' })}</p>;
  if (error) return <p>{intl.formatMessage({ id: 'carsTable.error' })}</p>;

  return (
    <div className="content-container">
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>{intl.formatMessage({ id: 'carsTable.brand' })}</th>
              <th>{intl.formatMessage({ id: 'carsTable.line' })}</th>
              <th>{intl.formatMessage({ id: 'carsTable.model' })}</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={car.id} onClick={() => handleRowClick(car.id)}>
                <td>{index + 1}</td>
                <td>{car.marca}</td>
                <td>{car.linea}</td>
                <td>{car.modelo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <CarDetails car={selectedCar} />
    </div>
  );
};

export default CarsTable;
