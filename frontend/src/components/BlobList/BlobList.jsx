// BlobList.js
import React, { useEffect, useState } from 'react';
import { BlobServiceClient } from '@azure/storage-blob';
import './BlobListPage.css';

const BlobList = ({ refreshTrigger }) => {
  const [pdfBlobs, setPdfBlobs] = useState([]);
  const [videoBlobs, setVideoBlobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBlobs = async () => {
    setLoading(true);
    setError('');

    const sasUrl = 'https://ritanzwe.blob.core.windows.net/?sv=2022-11-02&ss=b&srt=sco&sp=rwdlaciytfx&se=2024-07-28T16:34:15Z&st=2024-07-28T08:34:15Z&spr=https&sig=cFTn2EEYbI8oc4yVChGba1l8ltDQqnYc27X2Br3DL3Q%3D';

    try {
      const blobServiceClient = new BlobServiceClient(sasUrl);
      const containerClient = blobServiceClient.getContainerClient('ritanzwe');

      const pdfs = [];
      const videos = [];
      for await (const blob of containerClient.listBlobsFlat()) {
        if (blob.name.endsWith('.pdf')) {
          pdfs.push(blob.name);
        } else if (blob.name.endsWith('.mp4')) {
          videos.push(blob.name);
        }
      }

      setPdfBlobs(pdfs);
      setVideoBlobs(videos);
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
    <div className="blob-list-page">
      <button className="refresh-button" onClick={fetchBlobs} disabled={loading}>
        {loading ? 'Refreshing...' : 'Refresh'}
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="blob-list-section">
        <h3>Uploaded Videos</h3>
        <ul>
          {videoBlobs.map((blob, index) => (
            <li key={index}>
              <a href={`https://ritanzwe.blob.core.windows.net/ritanzwe/${blob}`} target="_blank" rel="noopener noreferrer">
                {blob}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="blob-list-section">
        <h3>Uploaded PDFs</h3>
        <ul>
          {pdfBlobs.map((blob, index) => (
            <li key={index}>
              <a href={`https://ritanzwe.blob.core.windows.net/ritanzwe/${blob}`} target="_blank" rel="noopener noreferrer">
                {blob}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BlobList;
