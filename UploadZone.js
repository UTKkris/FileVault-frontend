import React from 'react';

export default function UploadZone({ onUpload }) {
  const handleChange = (e) => {
    if (e.target.files.length > 0) {
      onUpload(e.target.files);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-200 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <p className="mb-2 text-sm text-blue-600 font-medium">Click to upload or drag and drop</p>
          <p className="text-xs text-slate-400">Any file type (Images will show preview)</p>
        </div>
        <input type="file" className="hidden" multiple onChange={handleChange} />
      </label>
    </div>
  );
}