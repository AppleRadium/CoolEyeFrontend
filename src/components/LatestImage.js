import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LatestImage() {
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const fetchLatestImage = () => {
    // Use the current timestamp as a query parameter to bypass browser caching
    const timestamp = new Date().getTime();
    const endpoint = `https://protected-dawn-61147-56a85301481c.herokuapp.com/image/latest?${timestamp}`;

    axios({
      method: 'get',
      url: endpoint,
      responseType: 'blob'  // Important to handle binary data
    })
    .then(response => {
      // Create a local URL to display the image
      const imageObjectURL = URL.createObjectURL(response.data);
      setImageUrl(imageObjectURL);
    })
    .catch(error => {
      console.error('Error fetching the latest image:', error);
      setError('Failed to load the latest image.');
    });
  };

  useEffect(() => {
    fetchLatestImage(); // Fetch immediately on initial render
    const interval = setInterval(fetchLatestImage, 5000); // Refresh every 5000 milliseconds (5 seconds)

    // Cleanup: clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  return (
    <div>
      {error && <p>{error}</p>}
      {imageUrl ? <img src={imageUrl} alt="Latest Uploaded" style={{ width: '600px', height: 'auto', border: '2px solid black' }} /> : <p>Loading...</p>}
    </div>
  );
}

export default LatestImage;