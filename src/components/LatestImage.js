
import React, {useState, useEffect} from 'react';

function LatestImage(){
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');
  
    useEffect(() => {
      const fetchImage = async () => {
        try {
          const response = await fetch('https://protected-dawn-61147-56a85301481c.herokuapp.com/image/upload', { method: 'GET' });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Generate a URL for the blob
          const imageBlob = await response.blob();
          const imageObjectURL = URL.createObjectURL(imageBlob);
          setImageUrl(imageObjectURL);
        } catch (error) {
          console.error('Error fetching image:', error);
          setError('Failed to load image');
        }
      };
  
      fetchImage();
    }, []);
  
    return (
      <div>
        {error && <p>{error}</p>}
        {imageUrl && <img src={imageUrl} alt="Latest Uploaded" className = "image-style"/>}
      </div>
    );
}export default LatestImage