import { useState } from 'react';
import FilePreview from './FilePreview'; // import the new component

export default function DocumentUploader() {
  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([
  {
    name: 'report1.pdf',
    preview: 'This is a dummy preview of report1. It starts with an overview of the main content...'
  },
  {
    name: 'notes.txt',
    preview: 'Meeting notes:\n- Topic A discussed\n- Key decision: Move to production\n...'
  },
  {
    name: 'data.docx',
    preview: 'Data doc begins with a table of results followed by a brief interpretation of findings...'
  },
  // Add more dummy entries as needed
]);
  const [showAll, setShowAll] = useState(false);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    const res = await fetch('http://localhost:8000/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await res.json();
    alert(result.message || "Upload successful");

    const newUploaded = [...files].map(f => ({ name: f.name }));
    setUploadedFiles(prev => [...newUploaded, ...prev]);
    setFiles([]);
  };

  const handleDelete = (index) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  const visibleFiles = showAll ? uploadedFiles : uploadedFiles.slice(0, 10);

  return (
    <div className="p-4 flex flex-col h-full w-full">
      <div className="mb-4">
        <input type="file" multiple onChange={handleFileChange} accept=".pdf,.txt,.docx" className='text-white'/>
        <button onClick={handleUpload} className="ml-2 px-4 py-1 bg-purple-600 text-white font-[400] rounded">
          Upload
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {visibleFiles.map((file, index) => (
          <FilePreview key={index} file={file} onDelete={() => handleDelete(index)} />
        ))}
      </div>

      {uploadedFiles.length > 10 && (
        <div className="mt-2 text-sm text-blue-600 cursor-pointer hover:underline" onClick={() => setShowAll(!showAll)}>
          {showAll ? 'Show less' : '...more'}
        </div>
      )}
    </div>
  );
}
