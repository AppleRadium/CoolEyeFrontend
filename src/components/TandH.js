import axios from 'axios';
import React, { useState, useEffect } from 'react';

function TandH() {
    const [sensorData, setSensorData] = useState({ temperature: null, humidity: null });

    // Function to fetch sensor data
    const fetchSensorData = () => {
        axios.get('https://protected-dawn-61147-56a85301481c.herokuapp.com/sensor/latest')
            .then(response => {
                // Assuming response.data contains the temperature and humidity values
                const formattedData = {
                    ...response.data,
                    temperature: parseFloat(response.data.temperature).toFixed(2),
                    humidity: parseFloat(response.data.humidity).toFixed(2)
                };
                setSensorData(formattedData);
            })
            .catch(error => console.error('There was an error!', error));
    };

    useEffect(() => {
        fetchSensorData(); // Fetch once on component mount
        const intervalId = setInterval(fetchSensorData, 10000); // Refresh every 10000 milliseconds (10 seconds)

        // Cleanup function to clear the interval
        return () => clearInterval(intervalId);
    }, []);

    if (!sensorData.temperature || !sensorData.humidity) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p>Temperature: {sensorData.temperature}°F</p>
            <p>Humidity: {sensorData.humidity}%</p>
        </div>
    );
}

export default TandH;