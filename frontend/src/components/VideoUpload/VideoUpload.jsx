// VideoUploadPage.jsx
import React, { useState } from 'react';
import { BlobServiceClient } from '@azure/storage-blob';
import './VideoUpload.css';

const VideoUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Please select a file first.');
      return;
    }

    setUploading(true);

    const blobServiceClient = new BlobServiceClient('https://ritanzwe.blob.core.windows.net/?sv=2022-11-02&ss=b&srt=sco&sp=rwdlaciytfx&se=2024-07-28T16:34:15Z&st=2024-07-28T08:34:15Z&spr=https&sig=cFTn2EEYbI8oc4yVChGba1l8ltDQqnYc27X2Br3DL3Q%3D');
    const containerClient = blobServiceClient.getContainerClient('ritanzwe');
    const blockBlobClient = containerClient.getBlockBlobClient(file.name);

    try {
      await blockBlobClient.uploadBrowserData(file);
      setMessage('File uploaded successfully!');
      onUploadSuccess();  // Trigger the refresh
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Error uploading file.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="video-upload">
      <h2>Upload a Video</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

const VideoUploadPage = () => {
  const handleUploadSuccess = () => {
    console.log('File uploaded successfully!');
  };

  return (
    <div className="video-upload-page">
      <VideoUpload onUploadSuccess={handleUploadSuccess} />
    </div>
  );
};

export default VideoUploadPage;