import React from 'react';

export default function FileCard({ file, onDelete }) {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group">
      {/* Thumbnail / Icon */}
      <div className="w-16 h-16 flex-shrink-0 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center">
        {file.preview ? (
          <img src={file.preview} alt="preview" className="w-full h-full object-cover" />
        ) : (
          <span className="text-xs font-bold text-slate-400 uppercase">{file.type.split('/')[1] || 'DOC'}</span>
        )}
      </div>

      {/* Details */}
      <div className="flex-grow min-w-0">
        <h3 className="font-medium text-slate-800 truncate" title={file.name}>
          {file.name}
        </h3>
        <p className="text-xs text-slate-500">{file.size} • {file.type || 'Unknown'}</p>
      </div>

      {/* Delete Action */}
      <button 
        onClick={onDelete}
        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
        aria-label="Delete file"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}