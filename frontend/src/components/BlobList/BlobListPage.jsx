// BlobListPage.js
import React, { useState } from 'react';
import BlobList from './BlobList';
import './BlobListPage.css';

const BlobListPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshTrigger(refreshTrigger + 1);
  };

  return (
    <div className="blob-list-page">
      <BlobList refreshTrigger={refreshTrigger} />
    </div>
  );
};

export default BlobListPage;
