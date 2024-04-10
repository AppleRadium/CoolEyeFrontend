import React, { useEffect, useState } from 'react';
import axios from 'axios';

function LatestImage() {
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Replace 'your-backend-endpoint' with the actual endpoint URL
    const endpoint = 'https://protected-dawn-61147-56a85301481c.herokuapp.com/image/latest';
    
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

    // Cleanup the created URL to avoid memory leaks
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, []);  // Empty dependency array means this effect runs once after initial render

  return (
    <div>
      <h4>Latest Image</h4>
      {error && <p>{error}</p>}
      {imageUrl ? <img src={imageUrl} alt="Latest Uploaded" style={{ width: '200px', height: 'auto', border: '2px solid black' }} /> : <p>Loading...</p>}
    </div>
  );
}

export default LatestImage;