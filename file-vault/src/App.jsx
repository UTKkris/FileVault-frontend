import React, { useState, useRef, useEffect } from 'react';
import './App.css'; // We will add styling next

function App() {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  // Utility to convert raw bytes to readable sizes
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    
    const newFiles = uploadedFiles.map(file => ({
      // Generate a unique ID for React's key requirement and deletion logic
      id: crypto.randomUUID(), 
      name: file.name,
      size: formatBytes(file.size),
      type: file.type || 'Unknown Type',
      // Bonus: Generate a temporary browser URL if it's an image
      previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : null
    }));

    // Add new files to the existing state
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    
    // Reset the input so the user can upload the exact same file again if they delete it
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDelete = (idToDelete) => {
    setFiles(prevFiles => prevFiles.filter(file => {
      // Memory management: Revoke the object URL to avoid browser memory leaks
      if (file.id === idToDelete && file.previewUrl) {
        URL.revokeObjectURL(file.previewUrl);
      }
      return file.id !== idToDelete;
    }));
  };

  // Cleanup object URLs when the component unmounts
  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file.previewUrl) URL.revokeObjectURL(file.previewUrl);
      });
    };
  }, [files]);

  return (
    <div className="vault-container">
      <header className="vault-header">
        <h1>File Vault UI</h1>
        <p>Local browser storage simulation</p>
      </header>

      <section className="upload-section">
        <label htmlFor="file-upload" className="custom-file-upload">
          Click to Select Files
        </label>
        <input 
          id="file-upload" 
          type="file" 
          multiple 
          onChange={handleFileUpload} 
          ref={fileInputRef}
        />
      </section>

      <section className="file-list-section">
        <h2>Uploaded Files ({files.length})</h2>
        
        {files.length === 0 ? (
          <p className="empty-state">Your vault is empty.</p>
        ) : (
          <ul className="file-list">
            {files.map(file => (
              <li key={file.id} className="file-card">
                <div className="file-preview">
                  {file.previewUrl ? (
                    <img src={file.previewUrl} alt="preview" className="thumbnail" />
                  ) : (
                    <div className="file-icon">📄</div>
                  )}
                </div>
                
                <div className="file-details">
                  <span className="file-name">{file.name}</span>
                  <div className="file-meta">
                    <span className="file-size">{file.size}</span> • 
                    <span className="file-type">{file.type}</span>
                  </div>
                </div>

                <button 
                  onClick={() => handleDelete(file.id)} 
                  className="delete-btn"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default App;