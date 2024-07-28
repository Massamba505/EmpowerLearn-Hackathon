// BlobList.js
import React, { useEffect, useState } from 'react';
import { BlobServiceClient } from '@azure/storage-blob';


const BlobList = ({ refreshTrigger }) => {
  const [blobs, setBlobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBlobs = async () => {
    setLoading(true);
    setError('');

    const sasUrl = 'https://ritanzwe.blob.core.windows.net/?sv=2022-11-02&ss=b&srt=sco&sp=rwdlaciytfx&se=2024-07-28T16:34:15Z&st=2024-07-28T08:34:15Z&spr=https&sig=cFTn2EEYbI8oc4yVChGba1l8ltDQqnYc27X2Br3DL3Q%3D';

    try {
      const blobServiceClient = new BlobServiceClient(sasUrl);
      const containerClient = blobServiceClient.getContainerClient('ritanzwe');

      const blobsList = [];
      for await (const blob of containerClient.listBlobsFlat()) {
        blobsList.push(blob.name);
      }

      setBlobs(blobsList);
    } catch (err) {
      console.error('Error fetching blobs:', err);
      setError('Error fetching blobs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlobs();
  }, [refreshTrigger]);

  return (
    <div className="blob-list">
      <h2>Uploaded Videos</h2>
      <button onClick={fetchBlobs} disabled={loading}>
        {loading ? 'Refreshing...' : 'Refresh'}
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <ul>
        {blobs.map((blob, index) => (
          <li key={index}>
            <a href={`https://ritanzwe.blob.core.windows.net/ritanzwe/${blob}`} target="_blank" rel="noopener noreferrer">
              {blob}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BlobList;
