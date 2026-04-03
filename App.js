import React, { useState } from 'react';
import FileCard from './components/FileCard';
import UploadZone from './components/UploadZone';

function App() {
  const [files, setFiles] = useState([]);

  const handleUpload = (newFiles) => {
    const processedFiles = Array.from(newFiles).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: (file.size / 1024).toFixed(2) + ' KB',
      type: file.type,
      preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : null,
    }));
    
    setFiles(prev => [...prev, ...processedFiles]);
  };

  const deleteFile = (id) => {
    setFiles(files.filter(f => f.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 border-b pb-4">
          <h1 className="text-3xl font-bold text-slate-800">File Vault</h1>
          <p className="text-slate-500">Manage your local assets securely.</p>
        </header>

        <main className="grid gap-8">
          <UploadZone onUpload={handleUpload} />

          <section>
            <h2 className="text-xl font-semibold mb-4 text-slate-700">
              Your Files ({files.length})
            </h2>
            
            {files.length === 0 ? (
              <div className="bg-white border-2 border-dashed rounded-xl p-12 text-center text-gray-400">
                No files uploaded yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {files.map(file => (
                  <FileCard key={file.id} file={file} onDelete={() => deleteFile(file.id)} />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;