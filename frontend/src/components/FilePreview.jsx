export default function FilePreview({ file, onDelete }) {
  return (
    <div className="relative bg-gray-100 rounded p-3 shadow text-sm">
      <button
        onClick={onDelete}
        className="absolute top-1 right-1 text-red-500 font-bold hover:text-red-700"
      >
        ×
      </button>
      <p className="font-semibold truncate">{file.name}</p>
      <div className="mt-2 text-gray-700 text-xs max-h-32 overflow-hidden whitespace-pre-wrap">
        {file.preview || 'No preview available.'}
      </div>
    </div>
  );
}
